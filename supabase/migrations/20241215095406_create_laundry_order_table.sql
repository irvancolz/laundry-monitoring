create type laundry_order_status as enum (
'finished',
'onprogress',
'canceled'
);

create table if not exists laundry_order (
    "id" uuid default uuid_generate_v4() primary key,
    "code" text unique,
    "branch_id" bigint references laundry_branch,
    "branch_name" text,
    "service_id" bigint references laundry_service,
    "service_name" text,
    "status" laundry_order_status default 'onprogress',
    "customer_name" text, 
    "finish_expectation" timestamptz,
    "qty" decimal,
    "price" int,
    "notes" text, 
    "created_at" timestamptz default now(),
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text,
    "is_deleted" boolean default false
)