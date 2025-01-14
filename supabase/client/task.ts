import { OrderTask, OrderTaskRequest } from "@/type/laundry";
import { OrderTaskContract } from "@/api/contract";
import { supabase } from ".";
import { SUPABASE_TASK_TABLE } from "./const";
import { date } from "@/utils/date";

async function getAll(): Promise<OrderTask[]> {
  const { data, error } = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select()
    .eq("is_deleted", false);
  if (error != null) throw error;

  return data;
}

async function create(task: OrderTaskRequest): Promise<OrderTask> {
  const existing = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select("*", { count: "exact", head: false });

  if (existing.error)
    throw new Error("failed to check current existing task total");

  task.code = "TSK" + new String((existing.count || 0) + 1).padStart(3, "0");
  task.order = (existing.count || 0) + 1;
  task.created_by = "PLACEHOLDER";
  task.created_at = date.currentTime();

  const { data, error } = await supabase
    .from(SUPABASE_TASK_TABLE)
    .insert(task)
    .select()
    .single();

  if (error != null) throw error;

  return data;
}

async function update(task: OrderTask): Promise<OrderTask> {
  const updatePayload = {
    name: task.name,
    description: task.description,
    updated_at: date.currentTime(),
    updated_by: "PLACEHOLDER",
  };
  const { data, error } = await supabase
    .from(SUPABASE_TASK_TABLE)
    .update(updatePayload)
    .eq("id", task.id)
    .select()
    .single();
  if (error != null) throw error;

  return data;
}

async function remove(task: OrderTask): Promise<OrderTask> {
  const { data, error } = await supabase
    .from(SUPABASE_TASK_TABLE)
    .update({
      deleted_at: date.currentTime(),
      deleted_by: "PLACEHOLDER",
      is_deleted: true,
    })
    .eq("id", task.id)
    .select()
    .single();
  if (error != null) throw error;

  return data;
}

export const orderTaskApi: OrderTaskContract = {
  getAll,
  create,
  update,
  delete: remove,
};
