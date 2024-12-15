create table if not exists laundry_branch (
    "id" bigint primary key generated always as identity,
    "name" text,
    "code" text,
    "is_washing_station" boolean,
    "address" text,
    "created_at" timestamptz,
    "created_by" text,
    "updated_at" timestamptz,
    "updated_by" text,
    "deleted_at" timestamptz,
    "deleted_by" text
)