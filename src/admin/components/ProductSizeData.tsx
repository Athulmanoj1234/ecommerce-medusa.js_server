import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from "@medusajs/ui"
import { ProductSizeDbInfo } from '../../ecommerce.types';
import { ProductSizeDto, ProductSizeResponseData } from '../admin.types';
import { getProductSizeById } from '../../query/action';
import { medusaServerUrl } from '../constants';

const ProductSizeData = ({ productSizeData }: { productSizeData: ProductSizeDbInfo[] }) => {

    const medusaBackendServerUrl = medusaServerUrl;

    const initialProductSizeInfo: ProductSizeDto = {
            shortName: "",
            fullName: "",
            productId: "",
    }
    const [isEdit, setEdit] = useState(false);
    const [productSizeInfo, setProductSizeInfo] = useState<ProductSizeDto>(initialProductSizeInfo);
    const [editProductSizeData, setEditProductSizeData] = useState<ProductSizeResponseData>();
    const [productSizeid, setProductSizeId] = useState<string>("")

    const handleEdit = async (id: string) => {
        
        setEdit(currentEditState => !currentEditState);
        const productSizeDataToEdit = await getProductSizeById(id);
        setEditProductSizeData(productSizeDataToEdit);
    }

    const handleDelete = async (productSizeId: string) => {
        await fetch(`${medusaBackendServerUrl}/getproductsize/${productSizeId}`, {
          method: 'DELETE',
        });
      }

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditProductSizeData({ ...editProductSizeData, [name]: value });
    }

    const updateProductSize = async (e: any) => {
        e.preventDefault();
        
          try {
            const res = await fetch(`${medusaBackendServerUrl}/getproductsize/${editProductSizeData?.id}`, {
              method: 'POST',
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(editProductSizeData),
            });

            const productSizeUpdateResponse = await res.json();
            console.log("product update res:", productSizeUpdateResponse);
          } catch (err) {
            console.log("product update error", err);
          }
      }


  return (
    <div className="">
        { isEdit ? (
          <form action="" className="flex flex-col gap-2">
          <Input type="text" placeholder="short name" name="short_name" value={editProductSizeData?.short_name} onChange={handleChange} />
          <Input type="text" placeholder="full name" name="full_name" value={editProductSizeData?.full_name} onChange={handleChange} />
          <Input type="text" placeholder="product list id" name="product_lists_id" value={editProductSizeData?.product_lists_id} onChange={handleChange} />
          {/* <Input type="text" placeholder="product color" name="productColour" value={productData.productColour} onChange={handleChange} />
          <Input type="text" placeholder="product size" name="productSize" value={productData.productSize} onChange={handleChange} /> */}
          <Button onClick={updateProductSize}>send</Button>
        </form> ) : ( 
            <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>id</Table.HeaderCell>
                    <Table.HeaderCell>short name</Table.HeaderCell>
                    <Table.HeaderCell>full name</Table.HeaderCell>
                    <Table.HeaderCell>update or edit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                { productSizeData.map((productSizeData: ProductSizeDbInfo) => (
                <Table.Row>
                    <Table.Cell>{productSizeData.id}</Table.Cell>
                    <Table.Cell>{productSizeData.short_name}</Table.Cell>
                    <Table.Cell>{productSizeData.full_name}</Table.Cell>
                    <Table.Cell>
                        <Button onClick={() => handleEdit(productSizeData.id)}>Edit</Button>
                        <Button onClick={() => handleDelete(productSizeData.id)}>delete</Button>    
                    </Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
        </Table>
         )
        }
        
      </div>
  )
}

export default ProductSizeData
