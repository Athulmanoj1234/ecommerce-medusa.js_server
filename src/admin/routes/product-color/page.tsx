import { defineRouteConfig } from "@medusajs/admin-sdk";
import { useEffect, useState } from "react";
import { Heading, Container, Button, Input } from "@medusajs/ui"
import ProductSizeData from "../../components/ProductSizeData";
import ProductColorData from "../../components/ProductColorData";
import { getProductColors } from "../../../query/action";
import { ProductColorDbInfo } from "../../../ecommerce.types";
import { medusaServerUrl } from "../../constants";

export interface ProductColorInfo {
    color: string;
    hexCode: string;
    productId: string;
} 

// export const medusaServerUrl = import.meta.env.VITE_MEDUSA_SERVER_URL;


function ProductColorWidget() {
    
    const initialProductColorInfo: ProductColorInfo = {
        color: "",
        hexCode: "",
        productId: "",
    }

    //const medusaServerUrl = process.env.MEDUSA_SERVER_URL;
    const medusaBackendServerUrl = medusaServerUrl;
     
    const [isNewProductColor, setIsNewProductColor] = useState(false);
    const [productColorInfo, setProductColorInfo] = useState<ProductColorInfo>(initialProductColorInfo);
    const [productColorResponse, setproductColorResponse] = useState<ProductColorDbInfo[]>([]);

    useEffect(() => {
            const fetchData = async () => {
              const productColorData = await getProductColors();
              setproductColorResponse(productColorData);
            }
            fetchData();
          }, []);
   
    const createNewProductColor = () => {
    setIsNewProductColor(prevState => !prevState);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProductColorInfo({...productColorInfo, [name]: value});
    }

    const sendProductColorInfo = async (e: any) => {
        e.preventDefault();
        const res = await fetch(`${medusaBackendServerUrl}/product-color`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productColorInfo),
        })
        // const productSizeResponse = await res.json();
        console.log(res);
    }

  return (
    
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product Color</Heading>
        <Button onClick={createNewProductColor}>{isNewProductColor ? 'view productsizes' : 'create new'}</Button>
      </div>
      {/* value={productData.title}  */}
      { isNewProductColor ? 
          <form action="" className="flex flex-col gap-2">
            <Input type="text" placeholder="color" name="color" value={productColorInfo.color} onChange={handleChange} />
            <Input type="text" placeholder="hex code" name="hexCode" value={productColorInfo.hexCode} onChange={handleChange} />
            <Input type="text" placeholder="product list id" name="productId" value={productColorInfo.productId} onChange={handleChange} />
            {/* <Input type="text" placeholder="product color" name="productColour" value={productData.productColour} onChange={handleChange} />
            <Input type="text" placeholder="product size" name="productSize" value={productData.productSize} onChange={handleChange} /> */}
            <Button onClick={sendProductColorInfo}>send</Button>
          </form>
        : <ProductColorData 
          productColorData = {productColorResponse}
        /> }
    </Container>
  )
}

export const config = defineRouteConfig({
    label: "Product Color",
})

export default ProductColorWidget
