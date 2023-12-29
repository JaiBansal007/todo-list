import express from "express";
import { alltask, delet, newTask, updatetask } from "../controllers/task.js";
import {isauthanticated} from "../middlewares/auth.js"
const router =express.Router();

router.post("/newTask",isauthanticated,newTask);
router.get("/all",isauthanticated,alltask);
router.route("/:id").put(isauthanticated,updatetask).delete(isauthanticated,delet);

export default router;
