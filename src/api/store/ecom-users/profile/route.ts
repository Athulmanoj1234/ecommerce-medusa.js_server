import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import jwt from 'jsonwebtoken';
import { userInfo } from "os";

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
    const token = req.cookies.userToken;
    if (!token) {
        return res.json({ messege: "failed to send token via req" });
    }
    jwt.verify(token, "userSecret", {}, (err, info) => {
        if (err) {
            return res.json({ messege: "token parsing error" });
        } 
        console.log("userInfo", info);
        res.json(info);
    })
    
}