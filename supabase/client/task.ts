import { OrderTask } from "@/type/laundry";
import { OrderTaskContract } from "@/api/contract";

export async function getAll(): Promise<OrderTask[]> {
  return [];
}

export const orderTaskApi: OrderTaskContract = { getAll };
