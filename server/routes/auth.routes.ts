import express from "express";
import { CreateUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/user/login", CreateUser);

export default router;
