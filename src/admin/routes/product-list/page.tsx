import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Button, Container, Heading, Input, Textarea } from "@medusajs/ui"
import { useEffect, useState } from "react"
import axios from "axios"
import { string } from "prop-types";
import { getProducts } from "../../../query/action.ts"
import { ProductDataDto, ProductResponseData } from "../../admin.types.ts"
import ProductData from "../../components/ProductData.tsx";
import { medusaServerUrl } from "../../constants.ts";


const medusaBackendServerUrl = medusaServerUrl;

// The widget
const ProductWidget = () => {

  const initialProductState: ProductDataDto = {
    title: "",
    ratings: "",
    price: '',
    // productColour: "",
    // productSize: "",
    description: "",
    fabricare: "",
    //imageData: "",
  }

  //const medusaServerUrl = process.env.MEDUSA_SERVER_URL;

  const [isNewProducts, setIsNewProducts] = useState(false);
  const [productData, setProductData] = useState<ProductDataDto>(initialProductState);
  const [productImg, setproductImg] = useState<FileList | null>();
  const [productDataResponse, setProductDataResponse] = useState<ProductResponseData[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProducts();
      setProductDataResponse(productData);
    }
    fetchData();
  }, []);
  
  const createNewProducts = () => {
    setIsNewProducts(prevState => !prevState);
  }

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductData({...productData, [name]: value});
  }
 
  console.log(productDataResponse);

  const sendProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.set("title", productData.title);
      formData.set("ratings", productData.ratings);
      formData.set("price", productData.price);
      formData.set("description", productData.description);
      formData.set("fabricare", productData.fabricare);
      if (productImg && productImg[0]) {
        formData.set("files", productImg[0]); // <-- append image file
      }
      console.log("Logging FormData content:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      
    const productPostResponse = await fetch(`${medusaBackendServerUrl}/product-list`, {
      method: 'POST', 
      body: formData,
    });
    console.log("product post response = ", productPostResponse);
    return productPostResponse.json();
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product Lists</Heading>
        <Button onClick={createNewProducts}>{isNewProducts ? 'view products' : 'create new'}</Button>
      </div>
      {/* value={productData.title}  */}
      { isNewProducts ? 
          <form action="" className="flex flex-col gap-2">
            <Input type="text" placeholder="title" name="title" value={productData.title} onChange={handleChange} />
            <Input type="text" placeholder="ratings" name="ratings" value={productData.ratings} onChange={handleChange} />
            <Input type="text" placeholder="price" name="price" value={productData.price} onChange={handleChange} />
            {/* <Input type="text" placeholder="product color" name="productColour" value={productData.productColour} onChange={handleChange} />
            <Input type="text" placeholder="product size" name="productSize" value={productData.productSize} onChange={handleChange} /> */}
            <Textarea placeholder="description" name="description" value={productData.description} onChange={handleChange} />
            <Textarea placeholder="fabriCare" name="fabricare" value={productData.fabricare} onChange={handleChange}/>
            <Input type="file" onChange={e => setproductImg(e.target.files)} />
            <Button onClick={sendProducts}>send</Button>
          </form>
        : 
        <ProductData 
           productDataResponse={productDataResponse}
        /> }
        
    </Container>
  )
}

// The widget's configurations
export const config = defineRouteConfig({
    label: "Product List",     // Shows in sidebar
})

export default ProductWidget;