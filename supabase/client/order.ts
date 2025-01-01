import {
  Order,
  OrderRequest,
  OrderStatus,
  OrderTask,
  TableMetaData,
} from "@/type/laundry";
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

  order.created_by = "PLACEHOLDER";

  // set branch name
  if (order.branch_id == null)
    throw new Error("failed to add order, please provide the branch origin");
  const branch = await supabaseApi.laundryBranch.get(order.branch_id);
  order.branch_name = branch.name;

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
    status: "onprogress",
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
  const updatePayload: OrderRequest & { id: string } & TableMetaData = {
    id: order.id,
    service_id: order.service_id,
    service_name: order.service_name,
    customer_name: order.customer_name,
    created_at: order.created_at,
    finish_expectation: order.finish_expectation,
    notes: order.notes,
    branch_id: order.branch_id,
    branch_name: order.branch_name,
    price: order.price,
    qty: order.qty,
    created_by: order.created_by,
  } as OrderRequest & { id: string } & TableMetaData;
  if (order.service_id == null)
    throw new Error("service not found, please select service type");
  // set service name
  const service = await supabaseApi.laundryService.get(order.service_id);
  updatePayload.service_name = service.name;
  updatePayload.updated_at = dayjs().format("DD/MM/YYYY HH:mm:ss");
  updatePayload.updated_by = "PLACEHOLDER";

  // set branch name
  if (updatePayload.branch_id == null)
    throw new Error("failed to add order, please provide the branch origin");
  const branch = await supabaseApi.laundryBranch.get(updatePayload.branch_id);
  updatePayload.branch_name = branch.name;

  // insert order
  const { data, error } = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .update(updatePayload)
    .eq("id", updatePayload.id)
    .select()
    .single();
  if (error != null) throw error;

  const progress = await getCurrentProgress(updatePayload.id);

  const result: Order = {
    ...order,
    ...data,
    id: data.id,
    status: data.status,
    is_deleted: false,
    service_name: service.name,
    current_progress: progress.name || "",
  };

  return result;
}

async function getAll(): Promise<Order[]> {
  const { data, error } = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .select()
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

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
): Promise<Pick<OrderTask, "id" | "name" | "order" | "description">> {
  const order = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .select("status")
    .eq("id", order_id)
    .single();
  if (order.error != null) throw order.error;

  if (order.data.status == "canceled") {
    const resp = {
      id: 0,
      name: "dibatalkan",
      description: "pesanan ini telah dibatalkan",
      order: 0,
    };
    return resp;
  }
  if (order.data.status == "finished") {
    const resp = {
      id: 0,
      name: "selesai",
      description: "pesanan ini telah selesai dan telah diambil oleh pelanggan",
      order: 0,
    };
    return resp;
  }

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
    .select(`id, order, name, description`)
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

async function cancel(order_id: string): Promise<Order> {
  const updatePayload: OrderRequest & {
    id: string;
    status: OrderStatus;
  } & TableMetaData = {
    id: order_id,
    updated_at: dayjs().format("DD/MM/YYYY HH:mm:ss"),
    updated_by: "PLACEHOLDER",
    status: "canceled",
  } as OrderRequest & { id: string; status: OrderStatus } & TableMetaData;

  const { data, error } = await supabase
    .from(SUPABASE_ORDER_TABLE)
    .update(updatePayload)
    .eq("id", updatePayload.id)
    .select()
    .single();
  if (error != null) throw error;

  const progress = await getCurrentProgress(updatePayload.id);

  const result: Order = {
    ...data,
    current_progress: progress.name || "",
  };

  return result;
}

async function proceed(order_id: string): Promise<Order> {
  const { data, count, error } = await supabase
    .from(SUPABASE_ORDER_PROGRESS_TABLE)
    .select(`order_task_id`, { count: "exact" })
    .eq("finished", false)
    .eq("laundry_order_id", order_id);
  if (error != null) throw error;

  // get the next progress
  const tasks = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select()
    .in(
      "id",
      data.map((el) => el.order_task_id)
    )
    .order("order", { ascending: true })
    .limit(1)
    .single();
  if (tasks.error) throw tasks.error;

  // update next progress
  const updatedTasks = await supabase
    .from(SUPABASE_ORDER_PROGRESS_TABLE)
    .update({ finished: true })
    .eq("laundry_order_id", order_id)
    .eq("order_task_id", tasks.data.id);

  if (updatedTasks.error != null) throw updatedTasks.error;

  // mark as completed, if its the last task need to be done
  if (count == 1) {
    const updatedOrder = await supabase
      .from(SUPABASE_ORDER_TABLE)
      .update({ status: "finished" })
      .eq("id", order_id);

    if (updatedOrder.error != null) throw updatedOrder.error;
  }

  const result = await supabaseApi.order.get(order_id);

  return result!;
}

export const orderApi: OrderContract = {
  create,
  getAll,
  update,
  get,
  getCurrentProgress,
  cancel,
  proceed,
};
