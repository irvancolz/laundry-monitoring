export type Order = {
  id: string;
  customer_name: string;
  type: "express" | "regular";
  status: "finished" | "on process";
  weight: number;
  origin: string;
  created_at: string;
  finish_expectation: string;
  process_id: string;
  price: number;
  notes?: string;
};
