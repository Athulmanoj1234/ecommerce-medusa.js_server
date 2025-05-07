import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType } from "../../../../ecommerce.types";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    console.log("params request reached", req.params.id);
    // res.json({ messege: "path params req reached", params: req.params.id });

    const getProductService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    console.log("req reached");
    const resData = await getProductService.getProductById(req.params.id);
    res.json(resData);
}