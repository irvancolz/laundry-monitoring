import { ApiContract } from "../contract";
import { branchApi } from "./branch";
import { orderApi } from "./order";
import { laundryServiceApi } from "./service";

export const supabaseApi: ApiContract = {
  laundryBranch: branchApi,
  laundryService: laundryServiceApi,
  order: orderApi,
};
