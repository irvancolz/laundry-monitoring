
create table if not exists laundry_order (
    "id" uuid default uuid_generate_v4() primary key,
    "code" text unique,
    "branch_id" bigint references laundry_branch,
    "service_id" bigint references laundry_service,
    "status" text,
    "customer_name" text, 
    "finish_expectation" timestamptz,
    "qty" int,
    "price" int,
    "notes" text, 
    "created_at" timestamptz,
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text
)