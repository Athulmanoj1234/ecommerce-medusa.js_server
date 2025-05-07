import { Migration } from '@mikro-orm/migrations';

export class Migration20250427070103 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "ecommerce_users" ("id" text not null, "user_name" text not null, "email" text not null, "password" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "ecommerce_users_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_ecommerce_users_deleted_at" ON "ecommerce_users" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "product_lists" ("id" text not null, "title" text not null, "ratings" integer not null, "product_image" text not null, "description" text not null, "fabricare" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_lists_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_lists_deleted_at" ON "product_lists" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "product_colors" ("id" text not null, "color" text not null, "hexcode" text not null, "product_lists_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_colors_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_colors_product_lists_id" ON "product_colors" (product_lists_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_colors_deleted_at" ON "product_colors" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "product_sizes" ("id" text not null, "short_name" text not null, "full_name" text not null, "product_lists_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_sizes_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_sizes_product_lists_id" ON "product_sizes" (product_lists_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_sizes_deleted_at" ON "product_sizes" (deleted_at) WHERE deleted_at IS NULL;`);

    // this.addSql(`alter table if exists "product_colors" add constraint "product_colors_product_lists_id_foreign" foreign key ("product_lists_id") references "product_lists" ("id") on update cascade;`);

    // this.addSql(`alter table if exists "product_sizes" add constraint  "product_sizes_product_lists_id_foreign" foreign key ("product_lists_id")
    // 
    // this.addSql(`ALTER TABLE if exists "product_sizes" RENAME COLUMN "shortName" to "short_name";`);
    // this.addSql(`ALTER TABLE if exists "product_sizes" RENAME COLUMN "fullName" to "full_name";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "product_colors" drop constraint if exists "product_colors_product_lists_id_foreign";`);

    this.addSql(`alter table if exists "product_sizes" drop constraint if exists "product_sizes_product_lists_id_foreign";`);

    this.addSql(`drop table if exists "ecommerce_users" cascade;`);

    this.addSql(`drop table if exists "product_lists" cascade;`);

    this.addSql(`drop table if exists "product_colors" cascade;`);

    this.addSql(`drop table if exists "product_sizes" cascade;`);
  }

}
