import { ProductColorResponseData, ProductResponseData, ProductSizeResponseData } from "../admin/admin.types";
import { medusaServerUrl } from "../admin/constants";
import { ProductColorDbInfo, ProductSizeDbInfo, ProductSizeInfo } from "../ecommerce.types";

export async function getProducts(): Promise<ProductResponseData[]> {
    const res = await fetch(`${medusaServerUrl}/product-list`, {
        cache: "no-cache",
    })
    const productData = await res.json();
    console.log("productList admin data", productData);
    return productData;
}

export async function getProductSizes(): Promise<ProductSizeDbInfo[]> {
    const res = await fetch(`${medusaServerUrl}/product-size`, {
        cache: "no-cache",
    });
    const productSize = await res.json();
    return productSize;
}

export async function getProductColors(): Promise<ProductColorDbInfo[]> {
    const res = await fetch(`${medusaServerUrl}/product-color`, {
        cache: "no-cache",
    });
    const productColor = await res.json();
    return productColor;  
}

export async function getProductById(productId: string | undefined): Promise<ProductResponseData> {
    const res = await fetch(`${medusaServerUrl}/getproduct/${productId}`, {
        cache: "no-cache",
    })
    const productData = await res.json();
    console.log("product to edit", productData);
    return productData;
}

export async function getProductColorById(productColorId: string): Promise<ProductColorResponseData> {
    const res = await fetch(`${medusaServerUrl}/getproductcolor/${productColorId}`, {
        cache: "no-cache",
    })
    const productColorData = await res.json();
    return productColorData;
}

export async function getProductSizeById(productSizeId: string): Promise<ProductSizeResponseData> {
    const res = await fetch(`${medusaServerUrl}/getproductsize/${productSizeId}`, {
        cache: "no-cache",
    })
    const productSizeData = await res.json();
    return productSizeData;
} 

