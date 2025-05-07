// import BlogModuleService from "./product.service"

import { Module } from "@medusajs/framework/utils"
import { ProductListModuleService } from "./product.service"

export const EcommerceModule = "Ecommerce"

export default Module(EcommerceModule, {
  service: ProductListModuleService,
})