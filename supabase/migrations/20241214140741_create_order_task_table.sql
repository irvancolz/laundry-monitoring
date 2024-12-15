create table if not exists order_task (
    "id" bigint primary key generated always as identity,
    "name" text,
    "code" text,
    "order" int,
    "created_at" timestamptz,
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text
)