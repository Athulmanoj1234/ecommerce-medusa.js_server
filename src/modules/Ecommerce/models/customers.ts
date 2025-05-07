import { model } from "@medusajs/framework/utils";

export const ecommerceUsers = model.define("ecommerce_users", {
    id: model.id().primaryKey(),
    user_name: model.text(),
    email: model.text(),
    password: model.text(),
})