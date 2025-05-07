import { defineRouteConfig } from "@medusajs/admin-sdk";
import { useEffect, useState } from "react";
import { Heading, Container, Button, Input } from "@medusajs/ui"
import ProductSizeData from "../../components/ProductSizeData";
import { json } from "body-parser";
import { getProductSizes } from "../../../query/action";
import { ProductSizeDbInfo } from "../../../ecommerce.types";
import { medusaServerUrl } from "../../constants";

export interface ProductSizeInfo {
    shortName: string;
    fullName: string;
    productId: string;
} 

function ProductSizeWidget() {
    
    // const productSizeData = getProductSizes();
    // console.log("productSizes", productSizeData);

    //const medusaServerUrl = process.env.MEDUSA_SERVER_URL;

    const medusaBackendServerUrl = medusaServerUrl;

    const initialProductSizeInfo: ProductSizeInfo = {
        shortName: "",
        fullName: "",
        productId: "",
    }
     
    const [isNewProductSize, setIsNewProductSize] = useState(false);
    const [productSizeInfo, setProductSizeInfo] = useState<ProductSizeInfo>(initialProductSizeInfo);
    const [productSizeResponse, setproductSizeResponse] = useState<ProductSizeDbInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const productSizeData = await getProductSizes();
          setproductSizeResponse(productSizeData);
        }
        fetchData();
      }, []);
   
    const createNewProductSize = () => {
    setIsNewProductSize(prevState => !prevState);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProductSizeInfo({...productSizeInfo, [name]: value});
    }

    const sendProductSizeInfo = async (e: any) => {
        e.preventDefault();
        const res = await fetch(`${medusaBackendServerUrl}/product-size`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productSizeInfo),
        })
        // const productSizeResponse = await res.json();
        console.log(res);
        
    }

  return (
    
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product Size</Heading>
        <Button onClick={createNewProductSize}>{isNewProductSize ? 'view productsizes' : 'create new'}</Button>
      </div>
      {/* value={productData.title}  */}
      { isNewProductSize ? 
          <form action="" className="flex flex-col gap-2">
            <Input type="text" placeholder="short name" name="shortName" value={productSizeInfo.shortName} onChange={handleChange} />
            <Input type="text" placeholder="full name" name="fullName" value={productSizeInfo.fullName} onChange={handleChange} />
            <Input type="text" placeholder="product list id" name="productId" value={productSizeInfo.productId} onChange={handleChange} />
            {/* <Input type="text" placeholder="product color" name="productColour" value={productData.productColour} onChange={handleChange} />
            <Input type="text" placeholder="product size" name="productSize" value={productData.productSize} onChange={handleChange} /> */}
            <Button onClick={sendProductSizeInfo}>send</Button>
          </form>
        : <ProductSizeData 
           productSizeData = { productSizeResponse }
        /> }
    </Container>
  )
}

export const config = defineRouteConfig({
    label: "Product Size",
})

export default ProductSizeWidget
