import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const isauthanticated=async(req,res,next)=>{
    try {
        const {token}=req.cookies;

        if(!token) return next(new errorHandler("Login First",400));

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        const user=await User.findById(decoded._id);
        req.user=user;
        next();
    } catch (error) {
        next(error);
    }
}