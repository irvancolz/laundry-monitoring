import {
  LaundryBranch,
  LaundryService,
  Order,
  OrderProgress,
  OrderRequest,
  OrderTask,
  OrderTaskProgress,
} from "@/type/laundry";

// dont mind this, just prepare if user want another db than supabase
export interface ApiContract {
  laundryBranch: LaundryBranchApiContract;
  laundryService: LaundryServiceApiContract;
  order: OrderContract;
  orderTask: OrderTaskContract;
}

export interface LaundryServiceApiContract {
  getAll: () => Promise<LaundryService[]>;
}

export interface OrderContract {
  getAll: () => Promise<Order[]>;
  create: (order: OrderRequest) => Promise<Order>;
  update: (order: Order) => Promise<Order>;
  get: (id: string) => Promise<Order | null>;
  getProgress: (id: string) => Promise<OrderTaskProgress[]>;
}

export interface OrderTaskContract {
  getAll: () => Promise<OrderTask[]>;
}

export interface LaundryBranchApiContract {
  getAll: () => Promise<LaundryBranch[]>;
}
