import { ApiContract } from "../contract";
import { branchApi } from "./branch";

export const supabaseApi: ApiContract = {
  laundryBranch: branchApi,
};
