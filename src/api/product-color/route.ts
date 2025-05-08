import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, ProductColorInfo } from "../../ecommerce.types";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const productColorInfo = req.body as ProductColorInfo;
    const productColorService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productColorReponse = await productColorService.createProductcolor(productColorInfo);
    res.json(productColorReponse);
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const productColorService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const productColorGetResponse = await productColorService?.getProductColors();
    res.json(productColorGetResponse); 
}