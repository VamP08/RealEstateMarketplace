import express from "express";
import { userInfo } from "os";
import { test,updateUser } from "../controllers/user.controller.js";
import { verifytoken } from "../utils/verifyuser.js";

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifytoken, updateUser)
export default router;