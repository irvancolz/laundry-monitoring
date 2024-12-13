import {
  LaundryBranch,
  LaundryService,
  Order,
  OrderRequest,
} from "@/type/laundry";

// dont mind this, just prepare if user want another db than supabase
export interface ApiContract {
  laundryBranch: LaundryBranchApiContract;
  laundryService: LaundryServiceApiContract;
  order: OrderContract;
}

export interface LaundryServiceApiContract {
  getAll: () => Promise<LaundryService[]>;
}

export interface OrderContract {
  getAll: () => Promise<Order[]>;
  create: (order: OrderRequest) => Promise<Order>;
  update: (order: Order) => Promise<Order>;
  get: (id: string) => Promise<Order | null>;
}

export interface LaundryBranchApiContract {
  getAll: () => Promise<LaundryBranch[]>;
}
