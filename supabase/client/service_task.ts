import { ServiceTask } from "@/type/laundry";
import { supabase } from ".";
import { SUPABASE_SERVICE_TASK_TABLE } from "./const";

async function get(service_id: number): Promise<ServiceTask[]> {
  const { data, error, count } = await supabase
    .from(SUPABASE_SERVICE_TASK_TABLE)
    .select("*", { count: "exact" })
    .eq("laundry_service_id", service_id);
  if (error != null) throw error;
  if (data == null || (count != null && count <= 0))
    throw new Error("service task not found");
  return data;
}

export const serviceTaskApi = { get };
