import { Button, Input, Table, Textarea } from "@medusajs/ui"
import { ProductDataDto, ProductResponseData } from "../admin.types"
import { useEffect, useState } from "react";
import { getProductById } from "../../query/action";
import { medusaServerUrl } from "../constants";
// import { ProductData } from "../../ecommerce.types";



const ProductData = ({ productDataResponse }: any) => {
  
  const medusaBackendServerUrl = medusaServerUrl;

  const [isEdit, setEdit] = useState(false);
  // const [productData, setProductData] = useState<ProductResponseData>(initialProductState);
  const [productId, setProductId] = useState<string>();
  const [editProductData, setEditProductData] = useState<ProductResponseData>();
  const [productImg, setproductImg] = useState<FileList | null>();
  // const [productUpdateError, setProductUpdateError] = useState<>()

  console.log("any data");
  console.log("productResponse", productDataResponse);

  console.log("editDataRes", editProductData);


  const handleEdit = async (id: string) => {
    //setProductId(id);
    setEdit(currentEditState => !currentEditState);
    const productDataToEdit = await getProductById(id);
    setEditProductData(productDataToEdit);
    console.log("data check");
  }

  const handleDelete = async (productId: string) => {
    await fetch(`${medusaBackendServerUrl}/getproduct/${productId}`, {
      method: 'DELETE',
    });
  }

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditProductData({ ...editProductData, [name]: value });
  }

  const updateProduct = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
      formData.set('id', editProductData?.id);
      formData.set("title", editProductData?.title);
      formData.set("ratings", editProductData?.ratings);
      formData.set("price", editProductData?.price);
      formData.set("description", editProductData?.description);
      formData.set("fabricare", editProductData?.fabricare);
      if (productImg && productImg[0]) {
        formData.set("files", productImg[0]); // <-- append image file
      }

      try {
        const res = await fetch(`${medusaBackendServerUrl}/getproductcolor/${editProductData?.id}`, {
          method: 'POST',
          body: formData,
        });
        const productUpdateResponse = await res.json();
        console.log("product update res:", productUpdateResponse);
      } catch (err) {
        console.log("product update error", err);
      }
  }

  console.log("to edit product", editProductData);
  
  return (
    <div className="h-full w-full">
      { isEdit ? (
          <form action="" className="flex flex-col gap-2">
          <Input type="text" placeholder="title" name="title" value={editProductData?.title} onChange={handleChange} />
          <Input type="text" placeholder="ratings" name="ratings" value={editProductData?.ratings} onChange={handleChange} />
          <Input type="text" placeholder="price" name="price" value={editProductData?.price} onChange={handleChange} />
          {/* <Input type="text" placeholder="product color" name="productColour" value={productData.productColour} onChange={handleChange} />
          <Input type="text" placeholder="product size" name="productSize" value={productData.productSize} onChange={handleChange} /> */}
          <Textarea placeholder="description" name="description" value={editProductData?.description} onChange={handleChange} />
          <Textarea placeholder="fabriCare" name="fabricare" value={editProductData?.fabricare} onChange={handleChange}/>
          <Input type="file" onChange={e => setproductImg(e.target.files)} />
          <Button onClick={updateProduct}>send</Button>
        </form>
        ) : ( 
        <Table className="h-full w-full">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>product</Table.HeaderCell>
              <Table.HeaderCell>ratings</Table.HeaderCell>
              <Table.HeaderCell>description</Table.HeaderCell>
              <Table.HeaderCell>fabricare</Table.HeaderCell>
              <Table.HeaderCell>update or delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="h-full w-full">
            {productDataResponse?.map((product: ProductResponseData) => 
            <Table.Row id={product?.id} className="">
              <Table.Cell>{product?.id}</Table.Cell>
              <Table.Cell className="flex gap-2 ml-[-14px]"><img className="h-9 w-9 mt-9" src={`${medusaBackendServerUrl}/static/${product.product_image}`}/>{product.title}</Table.Cell>
              <Table.Cell className="ml-[8px]">{product.ratings}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.fabricare}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Button onClick={() => handleEdit(product?.id)}>edit</Button>
                <Button onClick={() => handleDelete(product?.id)}>delete</Button>
              </Table.Cell>
            </Table.Row>
            )}
          </Table.Body>
        </Table>
          ) } 
      </div>
  )
}

export default ProductData
