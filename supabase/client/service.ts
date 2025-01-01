import {
  LaundryService,
  LaundryServiceRequest,
  OrderTask,
} from "@/type/laundry";
import { LaundryServiceApiContract } from "@/api/contract";
import { supabase, supabaseApi } from ".";
import {
  SUPABASE_SERVICE_TABLE,
  SUPABASE_SERVICE_TASK_TABLE,
  SUPABASE_TASK_TABLE,
} from "./const";
import { date } from "@/utils/date";

async function getAll(): Promise<LaundryService[]> {
  const { data, error } = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .select()
    .is("is_deleted", false);

  if (error != null) throw error;
  return data!;
}

async function get(id: number): Promise<LaundryService> {
  let { data, error, count } = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .select("*", { count: "exact" })
    .eq("id", id)
    .single();
  if (error != null) {
    throw error;
  }
  if ((count != null && count <= 0) || data == null) {
    throw new Error("service does not found");
  }

  return data as LaundryService;
}

async function create(
  service: LaundryServiceRequest,
  task: OrderTask[]
): Promise<LaundryService> {
  service.created_by = "PLACEHOLDER";
  service.created_at = date.currentTime();

  const existing = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .select("*", { count: "exact", head: false });

  if (existing.error)
    throw new Error("failed to check current existing service total");

  service.code = "SVC" + new String((existing.count || 0) + 1).padStart(3, "0");

  const { data, error } = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .insert(service)
    .select()
    .single();

  if (error != null) throw error;

  // generate tasks
  await supabaseApi.serviceTask.create(
    task.map((el) => ({ laundry_service_id: data.id, order_task_id: el.id }))
  );

  return data;
}

async function update(
  service: LaundryService,
  tasks: OrderTask[]
): Promise<LaundryService> {
  // update tasks
  const existingTasks = await supabaseApi.serviceTask.get(service.id);

  const deletedTasks = existingTasks
    .filter((ex) => tasks.find((nw) => nw.id == ex.order_task_id) == undefined)
    .map((el) => ({
      laundry_service_id: service.id,
      order_task_id: el.order_task_id,
    }));
  await supabaseApi.serviceTask.delete(deletedTasks);

  const newTasks = tasks
    .filter(
      (nw) => existingTasks.find((ex) => ex.order_task_id == nw.id) == undefined
    )
    .map((el) => ({ laundry_service_id: service.id, order_task_id: el.id }));
  await supabaseApi.serviceTask.create(newTasks);

  // update service
  const updatePayload = {
    name: service.name,
    pricing_type: service.pricing_type,
    price: service.price,
    service_time_hour: service.service_time_hour,
    updated_at: date.currentTime(),
    updated_by: "PLACEHOLDER",
  };

  const { data, error } = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .update(updatePayload)
    .eq("id", service.id)
    .select()
    .single();

  if (error != null) throw error;
  return data;
}

async function remove(id: number): Promise<LaundryService> {
  // remove the unused tasks
  const deletedTasks = await supabase
    .from(SUPABASE_SERVICE_TASK_TABLE)
    .update({ is_deleted: true })
    .eq("laundry_service_id", id);
  if (deletedTasks.error != null) throw deletedTasks.error;

  const deletePayload = {
    is_deleted: true,
    deleted_by: "PLACEHOLDER",
    deleted_at: date.currentTime(),
  };

  const { error, data } = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .update(deletePayload)
    .eq("id", id)
    .select()
    .single();
  if (error != null) throw error;

  return data;
}

async function getTasks(id: number): Promise<OrderTask[]> {
  const existingTasks = await supabase
    .from(SUPABASE_SERVICE_TASK_TABLE)
    .select()
    .eq("laundry_service_id", id)
    .eq("is_deleted", false);

  if (existingTasks.error != null) throw existingTasks.error;

  const tasks = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select()
    .in(
      "id",
      existingTasks.data.map((el) => el.order_task_id)
    );

  if (tasks.error != null) throw tasks.error;

  return tasks.data;
}

export const laundryServiceApi: LaundryServiceApiContract = {
  getAll,
  get,
  create,
  update,
  delete: remove,
  getTasks,
};
