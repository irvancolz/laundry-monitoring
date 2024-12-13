export type Order = {
  id: string;
  process_id: string;
  status: LaundryStatus;
} & OrderRequest;

export type LaundryType = string;

export type LaundryStatus = "finished" | "on process";

export type OrderRequest = {
  origin: string;
  type: LaundryType;
  customer_name: string;
  created_at: string;
  finish_expectation: string;
  weight: number;
  price: number;
  notes?: string;
  created_by: string;
};

export type LaundryBranch = {
  id: string;
  name: string;
  code: string;
  created_at: string;
  created_by: string;
};

export type LaundryService = {
  id: string;
  name: string;
  code: string;
  price_per_kg: number;
  service_time_hour: number;
  created_at: string;
  created_by: string;
};

export type OrderProgress = {
  id: string;
  order_id: string;
  task_id: string;
  status: LaundryStatus;
  created_at: string;
  updated_at?: string | null;
};

export type OrderTask = {
  id: string;
  order: number;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
};

// used in tracking section
export type OrderTaskProgress = OrderProgress &
  Pick<OrderTask, "description" | "name" | "order">;
