import { ApiContract } from "../contract";
import { branchApi } from "./branch";
import { orderApi } from "./order";
import { laundryServiceApi } from "./service";
import { orderTaskApi } from "./task";

export const supabaseApi: ApiContract = {
  laundryBranch: branchApi,
  laundryService: laundryServiceApi,
  order: orderApi,
  orderTask: orderTaskApi,
};
