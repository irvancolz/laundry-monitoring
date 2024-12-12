export type Order = {
  id: string;
  process_id: string;
  status: LaundryStatus;
} & OrderRequest;

export type LaundryType = "express" | "regular";

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
