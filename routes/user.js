import express from "express";
import { login, register, logout, profile } from "../controllers/user.js";
import { isauthanticated } from "../middlewares/auth.js";

const router =express.Router();

router.post("/register",register);

router.post("/login",login);

router.get("/profile",isauthanticated,profile);

router.get("/logout",isauthanticated,logout);

export default router;