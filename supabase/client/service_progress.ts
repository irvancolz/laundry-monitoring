import { OrderTask, OrderTaskProgress } from "@/type/laundry";
import { supabase, supabaseApi } from ".";
import { OrderProgressApiContract } from "@/api/contract";
import { SUPABASE_ORDER_PROGRESS_TABLE, SUPABASE_TASK_TABLE } from "./const";

async function generate(service_id: number, order_id: string) {
  const services = await supabaseApi.serviceTask.get(service_id);
  const task = await supabase
    .from(SUPABASE_TASK_TABLE)
    .select()
    .in(
      "id",
      services.map((el) => el.order_task_id)
    );

  if (task.error) throw task.error;
  if (task == null) throw new Error("task detail does not found");

  // auto finsihed first task
  const { error } = await supabase
    .from(SUPABASE_ORDER_PROGRESS_TABLE)
    .insert(
      task.data.map((svc) => ({
        order_task_id: svc.id,
        laundry_order_id: order_id,
        finished: svc.order == 0,
      }))
    )
    .select("*");
  if (error != null) throw error;
}

async function get(params: string): Promise<OrderTaskProgress[]> {
  return [
    {
      id: "PROG001",
      order_id: "ORD123",
      task_id: "TASK001",
      status: "finished",
      created_at: "2024-12-10T09:05:00Z",
      updated_at: "2024-12-10T09:10:00Z",
      name: "Order Received",
      description: "The order has been received and logged into the system.",
      order: 1,
    },
    {
      id: "PROG002",
      order_id: "ORD123",
      task_id: "TASK002",
      status: "on process",
      created_at: "2024-12-10T09:30:00Z",
      updated_at: "2024-12-10T10:15:00Z",
      name: "Clothes Sorted",
      description:
        "The clothes have been sorted based on color and fabric type.",
      order: 2,
    },
    {
      id: "PROG003",
      order_id: "ORD123",
      task_id: "TASK003",
      status: "on process",
      created_at: "2024-12-10T10:20:00Z",
      updated_at: "2024-12-10T11:45:00Z",
      name: "Clothes Washed",
      description: "The clothes have been washed using the selected service.",
      order: 3,
    },
    {
      id: "PROG004",
      order_id: "ORD123",
      task_id: "TASK004",
      status: "on process",
      created_at: "2024-12-10T12:00:00Z",
      updated_at: null,
      name: "Clothes Dried",
      description:
        "The washed clothes have been dried and are ready for ironing.",
      order: 4,
    },
    {
      id: "PROG005",
      order_id: "ORD123",
      task_id: "TASK005",
      status: "on process",
      created_at: "2024-12-10T13:00:00Z",
      updated_at: null,
      name: "Clothes Ironed",
      description: "The clothes have been ironed and neatly folded.",
      order: 5,
    },
    {
      id: "PROG006",
      order_id: "ORD123",
      task_id: "TASK006",
      status: "on process",
      created_at: "2024-12-10T14:30:00Z",
      updated_at: null,
      name: "Order Completed",
      description: "The order is ready for pickup or delivery to the customer.",
      order: 6,
    },
  ];
}

async function getUnfinishedTask(
  order_id: string
): Promise<Pick<OrderTask, "id" | "name" | "order">> {
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

export const orderProgressApi: OrderProgressApiContract = { get, generate };
