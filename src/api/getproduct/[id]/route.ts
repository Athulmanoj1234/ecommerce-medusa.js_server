import { logger, MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, ProductData } from "../../../ecommerce.types";
import { parsedProductsForm } from "../../../utils/form-parser";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const productListGetService = req.scope.resolve("Ecommerce") as EcommerceSevicesType ;
    const productSizeToEdit = await productListGetService?.getProductToEdit(req.params.id);
    res.json(productSizeToEdit);
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    console.log("params id:", req.params.id, "req body:", req.body);
    const productData = await parsedProductsForm(req) as ProductData;

    if (!productData && req.params.id) {
       return res.json({ messege: "form data failed to parsed or id not sent" });
    }
    console.log("product data", productData);
    const productUpdateService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productUpdatedStatus = await productUpdateService.editProduct(req.params.id, productData);
    res.json(productUpdatedStatus);
}


export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
    const productUpdateService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productDeleteStatus = await productUpdateService.deleteProduct(req.params.id);
    res.json(productDeleteStatus);
}