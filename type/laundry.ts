export type TableMetaData = {
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
};

export type OrderStatus = "finished" | "onprogress" | "canceled";

export type Order = {
  id: string;
  is_deleted: boolean | null;
  status: OrderStatus | null;
  current_progress: string | null;
} & OrderRequest &
  TableMetaData;

export type OrderRequest = {
  service_name: string | null;
  finish_expectation: string | null;
  service_id: number | null;
  customer_name: string | null;
  created_by: string | null;
  created_at: string | null;
  branch_id: number | null;
  branch_name: string | null;
  notes?: string | null;
  price: number | null;
  qty: number | null;
  code: string | null;
};

export type LaundryBranch = {
  id: number;
} & LaundryBranchRequest &
  TableMetaData;

export type LaundryBranchRequest = {
  code: string | null;
  is_washing_station: boolean | null;
  address: string | null;
  contact: string | null;
  open_hour: string | null;
  close_hour: string | null;
  name: string | null;
  created_at: string | null;
  created_by: string | null;
};

export type LaundryService = {
  id: number;
} & TableMetaData &
  LaundryServiceRequest;

export type LaundryServiceRequest = {
  pricing_type: "weight" | "piece" | null;
  service_time_hour: number | null;
  price: number | null;
  name: string | null;
  code: string | null;
  created_by: string | null;
  created_at: string | null;
};

export type LaundryServiceTask = {
  service_id: number | null;
  task_id: number | null;
  id: number;
} & TableMetaData;

export type OrderProgress = {
  laundry_order_id: string | null;
  order_task_id: string | null;
  finished: boolean | null;
  id: string;
} & TableMetaData;

export type OrderTask = {
  id: number;
} & TableMetaData &
  OrderTaskRequest;

export type OrderTaskRequest = {
  order: number | null;
  code: string | null;
  name: string | null;
  description: string | null;
  created_by: string | null;
  created_at: string | null;
};

export type ServiceTask = {
  id: number;
  order_task_id: number | null;
  laundry_service_id: number | null;
} & TableMetaData;

// used in tracking section
export type OrderTaskProgress = OrderProgress &
  Pick<OrderTask, "description" | "name" | "order">;
