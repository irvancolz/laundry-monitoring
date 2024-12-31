import { ServiceTask } from "@/type/laundry";
import { supabase } from ".";
import { SUPABASE_SERVICE_TASK_TABLE } from "./const";
import { date } from "@/utils/date";

async function get(service_id: number): Promise<ServiceTask[]> {
  const { data, error, count } = await supabase
    .from(SUPABASE_SERVICE_TASK_TABLE)
    .select("*", { count: "exact" })
    .eq("laundry_service_id", service_id)
    .eq("is_deleted", false);
  if (error != null) throw error;
  if (data == null || (count != null && count <= 0))
    throw new Error("service task not found");
  return data;
}

async function create(
  tasks: Pick<ServiceTask, "laundry_service_id" | "order_task_id">[]
): Promise<ServiceTask[]> {
  const payload = tasks.map((el) => ({
    ...el,
    created_at: date.currentTime(),
    created_by: "PLACEHOLDER",
  }));
  const { data, error } = await supabase
    .from(SUPABASE_SERVICE_TASK_TABLE)
    .insert(payload)
    .select();
  if (error != null) throw error;

  return data;
}

async function remove(
  tasks: Pick<ServiceTask, "laundry_service_id" | "order_task_id">[]
): Promise<ServiceTask[]> {
  const { data, error } = await supabase
    .from(SUPABASE_SERVICE_TASK_TABLE)
    .delete()
    .in(
      "laundry_service_id",
      tasks.map((e) => e.laundry_service_id)
    )
    .in(
      "order_task_id",
      tasks.map((e) => e.order_task_id)
    )
    .select();
  if (error != null) throw error;

  return data;
}

export const serviceTaskApi = { get, create, delete: remove };
