import { model } from "@medusajs/framework/utils";
import { productLists } from "./product-lists";

export const productColors = model.define("product_colors", { // ✅ use snake_case
  id: model.id().primaryKey(),
  color: model.text(),
  hexcode: model.text(),
  product_lists: model.belongsTo(() => productLists, {
    mappedBy: "product_colors", // ✅ must match the hasMany name in product_lists
  }),
});

