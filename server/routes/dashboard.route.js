import express from "express";
import { userInfo } from "os";
import { test,updateUser } from "../controllers/user.controller.js";
import { verifytoken } from "../utils/verifyuser.js";
import { postenv } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post('/dashboard', verifytoken, postenv)
export default router;