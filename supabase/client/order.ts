import { Order, OrderRequest } from "@/type/laundry";
import { OrderContract } from "@/api/contract";
import { supabase, supabaseApi } from ".";
import {
  SUPABASE_ORDER_PROGRESS_TABLE,
  SUPABASE_ORDER_TABLE,
  SUPABASE_TASK_TABLE,
} from "./const";
import dayjs from "dayjs";

async function create(order: OrderRequest): Promise<Order> {
  if (order.service_id == null)
    throw new Error("service not found, please select service type");
  // set service name
  const service = await supabaseApi.laundryService.get(order.service_id);
  order.service_name = service.name;
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
  const { data, error } = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .select()
    .eq("id", id)
    .single();
  if (error != null) throw error;

  const progress = await getCurrentProgress(id);

  const result: Order = { ...data, current_progress: progress.name };

  return result;
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
  const { data, error } = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .select()
    .eq("is_deleted", false);

  if (error != null) {
    throw error;
  }

  const result: Order[] = [];

  for (let i = 0; i < data.length; i++) {
    const progress = await getCurrentProgress(data[i].id);

    const order: Order = {
      ...data[i],
      current_progress: progress.name,
    };

    result.push(order);
  }

  return result;
}

async function getCurrentProgress(
  order_id: string
): Promise<{ id: number; order: number | null; name: string | null }> {
  const { data: progress, error } = await supabase
    .from(SUPABASE_ORDER_PROGRESS_TABLE)
    .select("order_task_id")
    .eq("finished", false)
    .eq("laundry_order_id", order_id);

  if (error != null) {
    throw error;
  }

  const taskTc = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select(`id, order, name`)
    .in(
      "id",
      progress.map((el) => el.order_task_id)
    )
    .order("order", { ascending: true })
    .limit(1)
    .single();

  if (taskTc.error != null) {
    throw error;
  }

  return taskTc.data;
}

export const orderApi: OrderContract = {
  create,
  getAll,
  update,
  get,
};
