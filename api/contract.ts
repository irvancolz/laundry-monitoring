import { LaundryBranch } from "@/type/laundry";

export interface ApiContract {
  laundryBranch: LaundryBranchApiContract;
}

export interface OrderApiContract {}
export interface LaundryBranchApiContract {
  getAll: () => Promise<LaundryBranch[]>;
}
