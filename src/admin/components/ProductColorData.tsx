import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from "@medusajs/ui"
import { ProductColorDbInfo } from '../../ecommerce.types';
import { ProductColorInfo } from '../routes/product-color/page';
import { ProductColorResponseData, ProductDataDto, ProdudctColorDto } from '../admin.types';
import { getProductColorById } from '../../query/action';
import { medusaServerUrl } from "../constants";

const ProductColorData = ({ productColorData }: { productColorData: ProductColorDbInfo[] }) => {
   
    const medusaBackendServerUrl = medusaServerUrl;

    const initialProductColorInfo: ProdudctColorDto = {
            color: "",
            hexcode: "",
            productId: "",
    }

    const [isEdit, setEdit] = useState(false);
    const [productColorInfo, setProductColorInfo] = useState<ProdudctColorDto>(initialProductColorInfo);
    const [editProductColorData, setEditProductColorData] = useState<ProductColorResponseData>();
    const [productColorId, setProductColorId] = useState<string>("");

    const handleEdit = async (id: string) => {
        setEdit(currentEditState => !currentEditState);
        const productSizeDataToEdit = await getProductColorById(id);
        setEditProductColorData(productSizeDataToEdit);
    }

    const handleDelete = async (productColorId: string) => {
        await fetch(`${medusaBackendServerUrl}/getproductcolor/${productColorId}`, {
          method: 'DELETE',
        });
      }

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditProductColorData({ ...editProductColorData, [name]: value });
    }


    const updateProductColor = async (e: any) => {
        e.preventDefault();
        
          try {
            const res = await fetch(`${medusaBackendServerUrl}/getproductcolor/${editProductColorData?.id}`, {
              method: 'POST',
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(editProductColorData),
            });

            const productSizeUpdateResponse = await res.json();
            console.log("product update res:", productSizeUpdateResponse);
          } catch (err) {
            console.log("product update error", err);
          }
    }


    console.log("productcolorinfo", productColorData);

return (
    <div className="">
        { isEdit ? (
        <form action="" className="flex flex-col gap-2">
            <Input type="text" placeholder="color" name="color" value={editProductColorData?.color} onChange={handleChange} />
            <Input type="text" placeholder="hex code" name="hexcode" value={editProductColorData?.hexcode} onChange={handleChange} />
            <Input type="text" placeholder="product list id" name="product_lists_id" value={editProductColorData?.product_lists_id} onChange={handleChange} />
            {/* <Input type="text" placeholder="product color" name="productColour" value={productData.productColour} onChange={handleChange} />
            <Input type="text" placeholder="product size" name="productSize" value={productData.productSize} onChange={handleChange} /> */}
            <Button onClick={updateProductColor}>send</Button>
        </form>
        ) : ( 
            <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>id</Table.HeaderCell>
                    <Table.HeaderCell>color</Table.HeaderCell>
                    <Table.HeaderCell>hex code</Table.HeaderCell>
                    <Table.HeaderCell>update or edit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                { productColorData.map((productColorData: ProductColorDbInfo) => (
                    <Table.Row key={productColorData.id}>
                        <Table.Cell className="">{productColorData.id}</Table.Cell>
                        <Table.Cell className="">{productColorData.color}</Table.Cell>
                        <Table.Cell className="">{productColorData.hexcode}</Table.Cell>
                        <Table.Cell className="flex gap-2">
                            <Button onClick={() => handleEdit(productColorData?.id)}>edit</Button>
                            <Button onClick={() => handleDelete(productColorData?.id)}>delete</Button>
                        </Table.Cell>
                    </Table.Row>
                )) }
            </Table.Body>
        </Table>
         ) }
        
      </div>
  )
}

export default ProductColorData