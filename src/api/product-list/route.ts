import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { EcommerceSevicesType, ProductData } from "../../ecommerce.types";
import { parsedProductsForm } from "../../utils/form-parser";


export const POST =  // this attaches req.file and req.body
  async (req: MedusaRequest, res: MedusaResponse) => {
    
        const productData = await parsedProductsForm(req) as ProductData;
        const productListService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
        const data = await productListService.createProducts(productData);
        res.json(data);
  }


export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const produtListService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
  const productData = await produtListService?.getAllProducts();
  res.json(productData);
}






