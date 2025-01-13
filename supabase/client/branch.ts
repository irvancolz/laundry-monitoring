import { LaundryBranch, LaundryBranchRequest } from "@/type/laundry";
import { LaundryBranchApiContract } from "@/api/contract";
import { supabase } from ".";
import { SUPABASE_BRANCH_TABLE } from "./const";
import { date } from "@/utils/date";

async function getAll(): Promise<LaundryBranch[]> {
  const { data, error } = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .select()
    .is("deleted_at", null)
    .is("deleted_by", null);
  if (error != null) throw error;

  return data;
}

async function get(id: number): Promise<LaundryBranch> {
  const { data, error } = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .select()
    .is("deleted_at", null)
    .is("deleted_by", null)
    .eq("id", id)
    .single();
  if (error != null) throw error;

  return data;
}

async function create(branch: LaundryBranchRequest): Promise<LaundryBranch> {
  const existing = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .select("*", { count: "exact", head: false });

  if (existing.error)
    throw new Error("failed to check current existing task total");
  branch.code = "BRN" + new String((existing.count || 0) + 1).padStart(3, "0");
  branch.created_at = date.currentTime();
  branch.created_by = "PLACEHOLDER";

  const { data, error } = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .insert(branch)
    .select()
    .single();
  if (error != null) throw error;

  return data;
}

async function update(branch: LaundryBranch): Promise<LaundryBranch> {
  const updatePayload = {
    is_washing_station: branch.is_washing_station,
    address: branch.address,
    open_hour: branch.open_hour,
    close_hour: branch.close_hour,
    contact: branch.contact,
    updated_at: date.currentTime(),
    updated_by: "PLACEHOLDER",
  };

  const { data, error } = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .update(updatePayload)
    .eq("id", branch.id)
    .select()
    .single();

  if (error != null) throw error;

  return data;
}

async function remove(branch: LaundryBranch): Promise<LaundryBranch> {
  const { data, error } = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .update({ deleted_at: date.currentTime(), deleted_by: "PLACEHOLDER" })
    .eq("id", branch.id)
    .select()
    .single();

  if (error != null) throw error;

  return data;
}

export const branchApi: LaundryBranchApiContract = {
  getAll,
  get,
  create,
  update,
  delete: remove,
};
