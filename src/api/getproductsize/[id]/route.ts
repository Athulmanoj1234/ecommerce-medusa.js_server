import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, ProductSizeInfo } from "../../../ecommerce.types";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const productListGetService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productToEdit = await productListGetService.getProductSizeToEdit(req.params.id);
    res.json(productToEdit);
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    console.log("params id:", req.params.id, "req body:", req.body);
    const productSizeData = req.body as ProductSizeInfo
    const productSizeUpdateService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productSizeUpdatedStatus = await productSizeUpdateService?.editProductSize(productSizeData) ;
    res.json(productSizeUpdatedStatus);
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
    const productSizeDeleteService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productSizeDeleteStatus = await productSizeDeleteService.deleteProductSize(req.params.id);
    res.json(productSizeDeleteStatus);
}