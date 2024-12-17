import { Order, OrderRequest, OrderTaskProgress } from "@/type/laundry";
import { OrderContract } from "@/api/contract";
import { supabase, supabaseApi } from ".";
import { SUPABASE_ORDER_PROGRESS_TABLE, SUPABASE_ORDER_TABLE } from "./const";
import dayjs from "dayjs";

async function create(order: OrderRequest): Promise<Order> {
  if (order.service_id == null)
    throw new Error("service not found, please select service type");
  // set service name
  const service = await supabaseApi.laundryService.get(order.service_id);

  // generate code
  const current = dayjs(order.created_at).unix();
  const code = `${service.code}${current}`;
  order.code = code;

  // insert order
  const { data, error } = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .insert(order)
    .select();
  if (error != null) throw error;

  // generate progress
  await supabaseApi.orderProgress.generate(order.service_id, data[0].id);

  const progress = await supabase
    .from(SUPABASE_ORDER_PROGRESS_TABLE)
    .select(
      `order_task(
        name
      )`
    )
    .eq("laundry_order_id", data[0].id)
    .is("finished", true)
    .single();
  if (progress.error != null) throw progress.error;
  if (progress.data == null)
    throw new Error("failed to get current progress status");

  const result: Order = {
    ...order,
    ...data[0],
    id: data[0].id,
    is_finished: false,
    is_deleted: false,
    service_name: service.name,
    current_progress: progress.data.order_task?.name || "",
  };

  return result;
}

async function get(id: string): Promise<Order | null> {
  return {
    id: "ORD001",
    customer_name: "John Doe",
    type: "IRO003",
    status: "on process",
    weight: 5.2,
    origin: "WSL004",
    created_at: "2024-12-10T10:15:30Z",
    finish_expectation: "2024-12-11T10:15:30Z",
    process_id: "PROC001",
    price: 52000,
    notes: "Handle with care, customer requested next-day delivery.",
    created_by: "admin",
  };
}

async function update(order: Order): Promise<Order> {
  return {
    id: "ORD001",
    customer_name: "John Doe",
    type: "Delicate Fabrics",
    status: "on process",
    weight: 5.2,
    origin: "Branch A",
    created_at: "2024-12-10T10:15:30Z",
    finish_expectation: "2024-12-11T10:15:30Z",
    process_id: "PROC001",
    price: 52000,
    notes: "Handle with care, customer requested next-day delivery.",
    created_by: "admin",
  };
}

async function getAll(): Promise<Order[]> {
  const { data, error } = await supabase.from(SUPABASE_ORDER_TABLE).select();

  if (error != null) {
    throw error;
  }

  return data;
}

export const orderApi: OrderContract = {
  create,
  getAll,
  update,
  get,
};
