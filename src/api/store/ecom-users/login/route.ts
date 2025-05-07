import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import jwt from "jsonwebtoken";
import { EcommerceSevicesType, UserInfo } from "../../../../ecommerce.types";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const userData = req.body as UserInfo;
    console.log("req reached");
    
    const userLoginService = req.scope.resolve("Ecommerce") as EcommerceSevicesType;
    const userDbInfo = await userLoginService.isLogin(userData);

    const username = userDbInfo.username;
    const id = userDbInfo.id;

    console.log("username:", username, "id:", id);
  
    try {
        jwt.sign({username, id}, process.env.JWT_USER_SECRET!, {}, (err, token) => {
            if (err) {
                return err;
            }
            return res.cookie('userToken', token).json({ usertoken: token, messege: "successfully created token" });
        })
    } catch (err) {
        console.log("token creation error", err);
    }
}