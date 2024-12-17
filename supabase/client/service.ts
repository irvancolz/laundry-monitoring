import { LaundryService } from "@/type/laundry";
import { LaundryServiceApiContract } from "@/api/contract";
import { supabase } from ".";
import { SUPABASE_SERVICE_TABLE } from "./const";

async function getAll(): Promise<LaundryService[]> {
  const { data, error } = await supabase
    .from(SUPABASE_SERVICE_TABLE)
    .select()
    .is("deleted_by", null)
    .is("deleted_at", null);

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

export const laundryServiceApi: LaundryServiceApiContract = { getAll, get };
