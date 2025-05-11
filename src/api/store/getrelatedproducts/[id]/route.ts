import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType } from "../../../../ecommerce.types";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    console.log("consoling query", req.params);
    const productId = req.params.id;
    console.log("in route", productId);
    const relatedProductService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const relatedProducts = await relatedProductService.getRelatedProducts(productId);
    res.json(relatedProducts);
} 