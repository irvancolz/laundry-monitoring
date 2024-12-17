import { LaundryBranch } from "@/type/laundry";
import { LaundryBranchApiContract } from "@/api/contract";
import { supabase } from ".";
import { SUPABASE_BRANCH_TABLE } from "./const";

async function getAll(): Promise<LaundryBranch[]> {
  const { data, error } = await supabase
    .from(SUPABASE_BRANCH_TABLE)
    .select()
    .is("deleted_by", null)
    .is("deleted_by", null);
  if (error != null) throw error;

  return data;
}

export const branchApi: LaundryBranchApiContract = {
  getAll,
};
