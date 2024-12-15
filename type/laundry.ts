export type Order = {
  id: string;
  status: LaundryStatus;
  code: string;
} & OrderRequest;

export type LaundryType = number;

export type LaundryStatus = "finished" | "on process";

export type OrderRequest = {
  branch_id: number;
  service_id: LaundryType;
  customer_name: string;
  created_at: string;
  finish_expectation: string;
  qty: number;
  price: number;
  notes?: string;
  created_by: string;
};

export type LaundryBranch = {
  id: number;
  name: string;
  code: string;
  is_washing_station: boolean;
  address: string;
  created_at: string;
  created_by: string;
};

export type LaundryService = {
  id: number;
  pricing_type: "weight" | "piece";
  name: string;
  code: string;
  price: number;
  service_time_hour: number;
  created_at: string;
  created_by: string;
};

export type LaundryServiceTask = {
  id: number;
  service_id: number;
  task_id: number;
  created_at: string;
  created_by: string;
};

export type OrderProgress = {
  id: string;
  order_id: string;
  task_id: string;
  finished: boolean;
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
