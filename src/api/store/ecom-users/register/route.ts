import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, UserInfo } from "../../../../ecommerce.types";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const userData = req.body as UserInfo;
    console.log(req.body);
    const productListService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const registerResponse = await productListService.registerCustomers(userData);
    res.json(registerResponse);
}