export type TableMetaData = {
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
};

export type Order = {
  id: string;
  is_finished: boolean | null;
  current_progress: string | null;
  is_deleted: boolean | null;
  service_name: string | null;
} & OrderRequest &
  TableMetaData;

export type OrderRequest = {
  finish_expectation: string | null;
  service_id: number | null;
  customer_name: string | null;
  created_by: string | null;
  created_at: string | null;
  branch_id: number | null;
  notes?: string | null;
  price: number | null;
  qty: number | null;
  code: string | null;
};

export type LaundryBranch = {
  is_washing_station: boolean | null;
  address: string | null;
  name: string | null;
  code: string | null;
  id: number;
} & TableMetaData;

export type LaundryService = {
  pricing_type: "weight" | "piece" | null;
  service_time_hour: number | null;
  price: number | null;
  name: string | null;
  code: string | null;
  id: number;
} & TableMetaData;

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
  id: string;
  name: string | null;
  order: number | null;
  description: string | null;
} & TableMetaData;

export type ServiceTask = {
  id: number;
  order_task_id: number | null;
  laundry_service_id: number | null;
} & TableMetaData;

// used in tracking section
export type OrderTaskProgress = OrderProgress &
  Pick<OrderTask, "description" | "name" | "order">;
