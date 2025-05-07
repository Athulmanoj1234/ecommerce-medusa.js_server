import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, ProductSizeInfo } from "../../ecommerce.types";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const productSizeData = req.body as ProductSizeInfo;
    const productSizeService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productSizePostResponse = await productSizeService?.createProductSize(productSizeData);
    res.json(productSizePostResponse);
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const productSizeService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productSizeGetResponse = await productSizeService?.getProductSizes();
    res.json(productSizeGetResponse);
}