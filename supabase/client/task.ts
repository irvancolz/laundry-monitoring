import { OrderTask } from "@/type/laundry";
import { OrderTaskContract } from "@/api/contract";
import { supabase } from ".";
import { SUPABASE_TASK_TABLE } from "./const";

export async function getAll(): Promise<OrderTask[]> {
  const { data, error } = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select()
    .eq("is_deleted", false);
  if (error != null) throw error;

  return data;
}

export const orderTaskApi: OrderTaskContract = { getAll };
