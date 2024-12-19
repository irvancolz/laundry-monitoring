import { OrderTaskProgress } from "@/type/laundry";
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

async function get(order_id: string): Promise<OrderTaskProgress[]> {
  const progress = await supabase
    .from(SUPABASE_ORDER_PROGRESS_TABLE)
    .select(
      `
      laundry_order_id, 
      finished, 
      order_task_id, 
      updated_at,
      id`
    )
    .eq("laundry_order_id", order_id);

  if (progress.error != null) throw progress.error;

  const result: OrderTaskProgress[] = [];
  for (let i = 0; i < progress.data.length; i++) {
    const task = await supabase
      .from(SUPABASE_TASK_TABLE)
      .select(`name, order, description`)
      .eq("id", progress.data[i].order_task_id!)
      .single();
    if (task.error != null) throw task.error;

    const resp: OrderTaskProgress = {
      ...progress.data[i],
      ...task.data,
    } as unknown as OrderTaskProgress;
    result.push(resp);
  }

  return result.sort((a, b) => a.order! - b.order!);
}

export const orderProgressApi: OrderProgressApiContract = { get, generate };
