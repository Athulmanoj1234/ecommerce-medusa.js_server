import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, ProductColorInfo, ProductData } from "../../../ecommerce.types";
import { parsedProductsForm } from "../../../utils/form-parser";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const productListGetService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productColorToEdit = await productListGetService.getProductColorToEdit(req.params.id);
    res.json(productColorToEdit);
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const productData = req.body as ProductColorInfo;
    const productColorUpdateService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productColorUpdatedStatus = await productColorUpdateService.editProductColor(productData);
    res.json(productColorUpdatedStatus);
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
    const productColorDeleteService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productColorDeleteStatus = await productColorDeleteService.deleteProductColor(req.params.id);
    res.json(productColorDeleteStatus);
}