import { model } from "@medusajs/framework/utils";  
import { productColors } from "./product-colors";
import { productSizes } from "./product-size";

export const productLists = model.define("product_lists", {
    id: model.id().primaryKey(),
    title: model.text(),
    ratings: model.number(),
    price: model.number(),
    product_image: model.text(),
    product_colors: model.hasMany(() => productColors),
    product_sizes: model.hasMany(() => productSizes),
    description: model.text(),
    fabricare: model.text()
});

