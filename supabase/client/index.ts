"use server";
import { createClient } from "@supabase/supabase-js";
import { ApiContract } from "@/api/contract";
import { branchApi } from "./branch";
import { orderApi } from "./order";
import { laundryServiceApi } from "./service";
import { orderTaskApi } from "./task";

export const supabaseApi: ApiContract = {
  laundryBranch: branchApi,
  laundryService: laundryServiceApi,
  order: orderApi,
  orderTask: orderTaskApi,
};

export const supabase = createClient(
  process.env.NEXT_PRIVATE_SUPABASE_URL!,
  process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!
);
