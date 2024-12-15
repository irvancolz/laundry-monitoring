create table if not exists laundry_progress (
    "id" uuid primary key default uuid_generate_v4(),
    "laundry_order_id" uuid references laundry_order,
    "order_task_id" bigint references order_task,
    "finished" boolean default false,
    "created_at" timestamptz default now(),
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text
) 