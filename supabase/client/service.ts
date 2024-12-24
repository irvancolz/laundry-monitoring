import { LaundryService, LaundryServiceRequest } from "@/type/laundry";
import { LaundryServiceApiContract } from "@/api/contract";
import { supabase } from ".";
import { SUPABASE_SERVICE_TABLE } from "./const";
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

async function create(service: LaundryServiceRequest): Promise<LaundryService> {
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
  return data;
}

async function update(service: LaundryService): Promise<LaundryService> {
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

export const laundryServiceApi: LaundryServiceApiContract = {
  getAll,
  get,
  create,
  update,
  delete: remove,
};
