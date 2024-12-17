create type service_pricing_type as enum (
'weight',
'piece'
);

create table if not exists laundry_service (
    "id" bigint primary key generated always as identity,
    "name" text,
    "pricing_type" service_pricing_type,
    "code" text,
    "service_time_hour" int,
    "price" int,
    "created_at" timestamptz default now(),
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text,
    "is_deleted" boolean default false
)