import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import taskrouter from "./routes/task.js"
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app=express();

config({
    path:"./data/config.env",
})

//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}));
//user-routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/todo",taskrouter);

//default route
app.get("/",(req,res)=>{
    res.send("nice working");
})

//error middleware
app.use(errormiddleware);
