create type gender as enum (
'pria',
'wanita'
);

create table if not exists employee (
    "id" bigint primary key generated always as identity,
    "name" text,
    "contact" text,
    "gender" gender,
    "created_at" timestamptz default now(),
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text,
    "is_deleted" boolean default false
) 