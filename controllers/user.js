import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utilities/feature.js";
import errorHandler from "../middlewares/error.js";

export const logout=(req,res,next)=>{
    return res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
        secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true,
    }).json({
        success:true,
        message:`bye bye ${req.user.name}`,
    })
}
export const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email}).select("+password");

        if(!user) return next(new errorHandler("User Doesn't Exists",404));

        const ismatch=await bcrypt.compare(password,user.password);

        if(!ismatch) return next(new errorHandler("Invalid ID or Password",404));

        sendCookie(user,res,200,`welcome back ${user.name}`);
    }catch(err){
        next(err);
    }

};
export const register=async(req,res,next)=>{
     
    try {
        const {name,email,password}=req.body;
     
        const user=await User.findOne({email:email});
    
        if(user) return next(new errorHandler("User already Exists",404));
    
        const hashedpassword=await bcrypt.hash(password,10);
    
        const newuser=await User.create({
            name,email,password:hashedpassword
        })
        sendCookie(newuser,res,201,"registered succesfully");
    } catch (error) {
        next(error);
    }
    
};
export const profile=async(req,res,next)=>{
    
    return res.status(200).json({
        success:true,
        message:req.user
    })
};