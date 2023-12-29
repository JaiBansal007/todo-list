import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const updatetask=async(req,res,next)=>{
    try{
        const task=await Task.findById(req.params.id);

        if(!task) return next(new errorHandler("Invalid id",404));

        task.isCompleted=!task.isCompleted;
        await task.save();


        res.status(200).json({
            success:true,
            message:"task successfully updated"
        })
    }catch(err){
        console.log("catch chal gya");
        next(err);
    }
}
export const delet=async(req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);

        if(!task) return next(new errorHandler("Task Doesn't Exists",404));

        await Task.deleteOne(task);
        
        res.status(201).json({
            success:true,
            message:"task successfully deleted"
        })
    } catch (error) {
        next(error);
    }


}
export const newTask=async(req,res,next)=>{

    try {
        const {title,discription}=req.body;

        await Task.create({
            title,
            discription,
            user:req.user
        })

        res.status(201).json({
            success:true,
            message:"task succesfully added",
        })
    } catch (error) {
        next(error);
    }
}
export const alltask=async(req,res,next)=>{

    const alltask=await Task.find({user:req.user._id});
    res.status(201).json({
        success:true,
        alltask
    })
}