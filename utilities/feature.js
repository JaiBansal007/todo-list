import jwt from "jsonwebtoken";

export const sendCookie=(newuser,res,statusCode=200,message)=>{

    const token=jwt.sign({_id:newuser._id},process.env.JWT_SECRET);
    return res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
        secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true,
    }).json({
        success:true,
        message
    })

}