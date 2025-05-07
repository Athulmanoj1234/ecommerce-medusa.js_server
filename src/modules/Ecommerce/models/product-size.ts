import { model } from "@medusajs/framework/utils";
import { productLists } from "./product-lists";

export const productSizes = model.define('product_sizes', {
        id: model.id().primaryKey(),
        short_name: model.text(),
        full_name: model.text(),
        product_lists: model.belongsTo(() => productLists, {
            mappedBy: "product_sizes",
        })
    }
)