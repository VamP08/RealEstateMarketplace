import jwt from "jsonwebtoken";
import { errorhandler } from "./error.js";
import dotenv from 'dotenv';
dotenv.config();

export const verifytoken = (req,res,next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorhandler(401,'Unauthorized'));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403,'Forbidden'))

        req.user = user;
        next();
    });
;}