import { Migration } from '@mikro-orm/migrations';

export class Migration20250428095410 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "product_lists" add column if not exists "price" integer;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "product_lists" drop column if exists "price";`);
  }

}
