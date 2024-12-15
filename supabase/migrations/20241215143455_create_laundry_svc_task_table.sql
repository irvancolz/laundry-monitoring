create table if not exists laundry_service_task (
    "id" bigint primary key generated always as identity,
    "order_task_id" bigint references order_task,
    "laundry_service_id" bigint references laundry_service,
    "created_at" timestamptz default now(),
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text
) 