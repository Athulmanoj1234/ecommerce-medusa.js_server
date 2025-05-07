import { InjectManager, MedusaContext, MedusaError, MedusaService } from "@medusajs/framework/utils";
import { colors } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import { productLists } from "./models/product-lists";
import { productColors } from "./models/product-colors";
import { Context } from "@medusajs/framework/types"
import { productSizes } from "./models/product-size";
import { EntityManager } from "@mikro-orm/knex";
import { ProductColorInfo, ProductData, ProductDbInfo, ProductSizeInfo, UserInfo } from "../../ecommerce.types";
import { ecommerceUsers } from "./models/customers";
import bcrypt from "bcrypt";


export class ProductListModuleService extends MedusaService({
    productLists,
    productColors,
    productSizes,
    ecommerceUsers,
}) { 
    @InjectManager()
    async createProducts( 
        productData: ProductData, @MedusaContext() sharedContext?: Context<EntityManager>
    ) {
        console.log("1s.product Data=", productData.product_image);
        const productId = uuidv4();
        const productRatings = productData.ratings ? parseInt(productData.ratings) : 'no ratings';
        const productPrice = productData.price ? parseInt(productData.price) : 'no price';
        
        if (!productData) {
            return { messege: "cant find and productData", status: 400 };
        }

        try {
            const insertedDoc = await sharedContext?.manager?.execute("INSERT INTO product_lists (id, title, ratings, price, description, fabricare, product_image) VALUES (?, ?, ?, ?, ?, ?, ?)", [productId, productData.title, productRatings, productPrice, productData.description, productData.fabricare, productData.product_image]);
            
            if (!insertedDoc) {
                return { messege: "failed to insert productinfo in the database", status: 500 }
            }
            return { messege: "inserted productdata successfully", status: 200 };

        } catch (err) {
            console.log(err);
            return { messege: "database error" }; 
        }
        
    }


    @InjectManager()
    async getAllProducts(@MedusaContext() sharedContext: Context<EntityManager>) {
        try {
            const fetchedProductDoc = await sharedContext.manager?.execute("SELECT * FROM product_lists");
            if (fetchedProductDoc) {
                return fetchedProductDoc;
            } 
        } catch (err) {
            console.log(err);
            throw new MedusaError(MedusaError.Types.DB_ERROR, "DB Error")
        }
    }

    @InjectManager()
    async getProductToEdit(productId, @MedusaContext() sharedContext: Context<EntityManager>) {
        if (!productId) {
            return { messege: "no productId to be found" };
        }
        try {
            const productData = await sharedContext.manager?.execute("SELECT * FROM product_lists WHERE id = ?", [productId]);
            console.log(productData![0]);
            return productData![0];
        } catch (err) {
            console.log(err);
            return { messege: "no product data to be fetched" };
        }
    }

    @InjectManager()
    async editProduct(productId: string, productData: ProductData, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("product-", productData);
        try {
            const res = await sharedContext.manager?.execute("SELECT * FROM product_lists WHERE id = ?", [productData.id]) as ProductDbInfo;
            const productDoc = res[0];

            const updatedProduct = await sharedContext.manager?.execute("UPDATE product_lists SET title = ?, ratings = ?, product_image = ?, description = ?, fabricare = ?, price = ? WHERE id = ?", [productData.title || productDoc.title, productData.ratings || productDoc?.ratings, productData.product_image || productDoc.product_image, productData.description || productDoc.description, productData.fabricare || productDoc.fabricare, productData.price || productDoc.price, productData.id]);

            if (!updatedProduct) {
                return { status: 500, messege: "failed to update data" };
            }

            return { status: 200, messege: "productlist updated successfully" };
        } catch (err) {
            console.log("err", err);
            return { messege: "failed to update or fetch form db" };
        }
    }

    @InjectManager()
    async deleteProduct(productId: string, @MedusaContext() sharedContext: Context<EntityManager>) {
        try {
            const deleteProductStatus = await sharedContext.manager?.execute("DELETE FROM product_lists WHERE id = ?", [productId]);

            if (!deleteProductStatus){
                return { status: 500, messege: "failed to delete product" };
            }

            return { status: 200, messege: "product deleted successfully" };
        
        } catch (err) {
            console.log("error while deleting product");
            return { status: 500, messege: err.messege };
        } 
    }


    @InjectManager()
    async registerCustomers(userInfo: UserInfo, @MedusaContext() sharedContext: Context<EntityManager>) {
           
        const userId = uuidv4();
        const userPassword = await bcrypt.hash(userInfo.password, 10);

        if (!userInfo) {
          throw new MedusaError(MedusaError.Types.NOT_FOUND, "userdata didnt received");
        }

        try {
            const userRegisterInfo = await sharedContext.manager?.execute("INSERT INTO ecommerce_users (id, user_name, email, password) VALUES(?,?,?,?)", [userId, userInfo.username, userInfo.email, userPassword]);
            if (userRegisterInfo) {
                return userRegisterInfo;
            }
        } catch (err) {
            console.log("db error:", err);
            throw new MedusaError(MedusaError.Types.DB_ERROR, "error in userinfo creation in database");
        }
    }


    @InjectManager()
    async isLogin(userInfo: UserInfo,
        @MedusaContext() sharedContext: Context<EntityManager>) {
        if (!userInfo) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, "userInfo didnt reached");
        }

        try {
            const userDoc = await sharedContext.manager?.execute("SELECT * FROM ecommerce_users WHERE user_name = ?", [userInfo.username]);

            if (!userDoc) {
                throw new MedusaError(MedusaError.Types.DB_ERROR, "cant fetch userinfo from database");
            }
            console.log("username:", userInfo.username, "password:", userInfo.password, "userDoc password", userDoc[0].password);
            const isLoggined = await bcrypt.compareSync(userInfo.password, userDoc[0]?.password);
            console.log("before checking", isLoggined);

            if (!isLoggined) {
                return { messege: "password or username is wrong" };
            }
            console.log("after checking", isLoggined);
            return { id: userDoc[0].password, username: userDoc[0].user_name };
        } catch (err) {
            console.log(err);
            throw new MedusaError(MedusaError.Types.DB_ERROR, "db error");
        }
    }

    
    @InjectManager()
    async createProductSize(productSizeInfo: ProductSizeInfo, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("productSizeInfo", productSizeInfo);
        
        if (!productSizeInfo) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, "data to be upload not found");
        } 
        try { 
            const productColorId = uuidv4();

            const insertedProductSizeData = await sharedContext.manager?.execute("INSERT INTO product_sizes (id, short_name, full_name, product_lists_id) VALUES(?,?,?,?)", [productColorId, productSizeInfo.shortName, productSizeInfo.fullName, productSizeInfo.productId]);
            return insertedProductSizeData;
        } catch (err) {
            console.log(err)
            return;
        }
    }

    
    @InjectManager()
    async getProductSizes(@MedusaContext() sharedContext: Context<EntityManager>) {
        try {
            const productSizes = await sharedContext.manager?.execute("SELECT * FROM product_sizes");
            return productSizes;
        } catch (err) {
            console.log("failed to fetch data from db", err);
            throw new MedusaError(MedusaError.Types.DB_ERROR, "failed to fetch data from db");
        }
    }

    @InjectManager()
    async getProductSizeToEdit(productId: string, @MedusaContext() sharedContext: Context<EntityManager>) {
        if (!productId) {
            return { messege: "no productId to be found" };
        }
        try {
            const productSizeData = await sharedContext.manager?.execute("SELECT * FROM product_sizes WHERE id = ?", [productId]);
            console.log(productSizeData);
            return productSizeData![0];
        } catch (err) {
            console.log(err);
            return { messege: "no product size data to be fetched" };
        }
    }

    @InjectManager()
    async editProductSize(productSizeData: ProductSizeInfo, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("product-", productSizeData);

        try {
            const res = await sharedContext.manager?.execute("SELECT * FROM product_sizes WHERE id = ?", [productSizeData.id]) as ProductSizeInfo[];
            const productSizeDoc = res[0];
            console.log("data before upate", productSizeDoc);

            try {
                const updatedProductSizes = await sharedContext.manager?.execute("UPDATE product_sizes SET short_name = ?, full_name = ?, product_lists_id = ? WHERE id = ?", [productSizeData.short_name || productSizeDoc.short_name, productSizeData.full_name || productSizeDoc.full_name, productSizeData.product_lists_id || productSizeDoc.product_lists_id, productSizeData.id]);
                console.log("updation status:", updatedProductSizes);
            
                if (!updatedProductSizes) {
                    return { status: 500, messege: "failed to update data" };
                }
            
                return { status: 200, messege: "productsizes updated successfully" };

            } catch (err) {
                console.log("product sizes updation error", err);
            }

        } catch (err) {
            console.log("err", err);
            return { messege: "failed to update or fetch form db" };
        }
    }


    @InjectManager()
    async deleteProductSize(productColorId: string, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("req reached");
        try {
            const deleteProductSizeStatus = await sharedContext.manager?.execute("DELETE FROM product_sizes WHERE id = ?", [productColorId]);

            if (!deleteProductSizeStatus){
                return { status: 500, messege: "failed to delete product size" };
            }

            return { status: 200, messege: "product size deleted successfully" };
        
        } catch (err) {
            console.log("error while deleting product size");
            return { status: 500, messege: err.messege };
        } 
    }


    @InjectManager()
    async createProductcolor(productColorInfo: ProductColorInfo, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("productSizeInfo", productColorInfo);
       
        if (!productColorInfo) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, "data to be upload not found");
        } 
        try { 
            const productColorId = uuidv4();
            const insertedProductSizeData = await sharedContext.manager?.execute("INSERT INTO product_colors (id, color, hexcode, product_lists_id) VALUES(?,?,?,?)", [productColorId, productColorInfo.color, productColorInfo.hexCode, productColorInfo.productId]);
            return insertedProductSizeData;
        } catch (err) {
            console.log(err)
            return;
        }
    }

    
    @InjectManager()
    async getProductColors(@MedusaContext() sharedContext: Context<EntityManager>) {
        try {
            const productColors = await sharedContext.manager?.execute("SELECT * FROM product_colors");
            return productColors;
        } catch (err) {
            console.log("failed to fetch data from db", err);
            throw new MedusaError(MedusaError.Types.DB_ERROR, "failed to fetch data from db");
        }
    }

    @InjectManager()
    async getProductColorToEdit(productId: string, @MedusaContext() sharedContext: Context<EntityManager>) {
        if (!productId) {
            return { messege: "no productId to be found" };
        }
        try {
            const productColorData = await sharedContext.manager?.execute("SELECT * FROM product_colors WHERE id = ?", [productId]);
            console.log(productColorData);
            return productColorData![0];
        } catch (err) {
            console.log(err);
            return { messege: "no product color data to be fetched" };
        }
    }

    @InjectManager()
    async editProductColor(productColorData: ProductColorInfo, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("product-", productColorData);

        try {
            const res = await sharedContext.manager?.execute("SELECT * FROM product_colors WHERE id = ?", [productColorData.id]) as ProductColorInfo[];
            const productColorDoc = res[0];
            console.log("data before upate", productColorDoc);

        try {
                const updatedProductSizes = await sharedContext.manager?.execute("UPDATE product_colors SET color = ?, hexcode = ?, product_lists_id = ? WHERE id = ?", [productColorData.color || productColorDoc.color, productColorData.hexcode || productColorDoc.hexcode, productColorData.product_lists_id || productColorDoc.product_lists_id, productColorData.id]);
                console.log("updation status:", updatedProductSizes);
            
                if (!updatedProductSizes) {
                    return { status: 500, messege: "failed to update data" };
                }
            
                return { status: 200, messege: "product color updated successfully" };

            } catch (err) {
                console.log("productcolor updation error", err);
            }
            
        } catch (err) {
            console.log("err", err);
            return { messege: "failed to update or fetch form db" };
        }
    }

    @InjectManager()
    async deleteProductColor(productColorId: string, @MedusaContext() sharedContext: Context<EntityManager>) {
        console.log("req reached");
        try {
            const deleteProductColorStatus = await sharedContext.manager?.execute("DELETE FROM product_colors WHERE id = ?", [productColorId]);

            if (!deleteProductColorStatus){
                return { status: 500, messege: "failed to delete product color" };
            }

            return { status: 200, messege: "product color deleted successfully" };
        
        } catch (err) {
            console.log("error while deleting product color");
            return { status: 500, messege: err.messege };
        } 
    }
    

    @InjectManager()
    async getProductById(productId: string, @MedusaContext() sharedContext: Context<EntityManager>) {

        if (!productId) {
            throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, "id didnt received");
        }
        try {
            const productInfo = await sharedContext.manager?.execute(`SELECT product_lists.id, product_lists.title, product_lists.ratings, product_lists.product_image, product_lists.description, product_lists.fabricare, product_lists.price, product_colors.id, product_colors.color, product_colors.hexcode, product_sizes.id, product_sizes.short_name, product_sizes.full_name
                FROM product_colors
                INNER JOIN product_lists ON product_colors.product_lists_id = product_lists.id 
                INNER JOIN product_sizes ON product_sizes.product_lists_id = product_lists.id
                WHERE product_lists.id = ?
                `, [productId]);

                function extractUnique(productInfo: any[], key: string) {
                    return [...new Set(productInfo.map((item: any) => item[key]))];
                }

                if (productInfo && productInfo.length > 0) {
                    const product_colors = extractUnique(productInfo, "hexcode");
                    const  product_sizes= extractUnique(productInfo, "short_name");
                    console.log("colors is :", product_colors, "sizes is:", product_sizes);

                    const { id, title, ratings, product_image, description, fabricare, price } = productInfo[0]; 

                    return { id, title, ratings, price, product_image, description, fabricare, product_colors, product_sizes };
                }
                throw new MedusaError(MedusaError.Types.DB_ERROR, "product information doesnt exist in the db or failed to fetch data from the database");
        } catch (err) {
            console.log(err);
        }
    }
}