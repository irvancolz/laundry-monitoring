import { createClient } from "@supabase/supabase-js";
import { ApiContract } from "@/api/contract";
import { branchApi } from "./branch";
import { orderApi } from "./order";
import { laundryServiceApi } from "./service";
import { orderTaskApi } from "./task";
import { Database } from "@/database.types";
import { serviceTaskApi } from "./service_task";
import { orderProgressApi } from "./service_progress";

export const supabaseApi: ApiContract = {
  laundryBranch: branchApi,
  laundryService: laundryServiceApi,
  order: orderApi,
  orderTask: orderTaskApi,
  serviceTask: serviceTaskApi,
  orderProgress: orderProgressApi,
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
