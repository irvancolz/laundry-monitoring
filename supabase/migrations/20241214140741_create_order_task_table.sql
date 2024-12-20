alter database postgres set datestyle to 'ISO, DMY';
alter database postgres
set timezone to 'Asia/Jakarta';
create table if not exists order_task (
    "id" bigint primary key generated always as identity,
    "name" text,
    "code" text,
    "order" int,
    "description" text,
    "created_at" timestamptz default now(),
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text,
    "is_deleted" boolean default false
)