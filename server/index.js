import express from 'express';
import mongoose from 'mongoose';
import dotenv  from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });
    
const app = express();
app.use(express.json());
app.use(cookieParser())

app.listen(5176, () => {
    console.log('Server is running on port 5176!');
    }
);

app.use("/server/user",userRouter);
app.use("/server/auth",authRouter);

app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const errormessage = err.message || 'Internal Server Error';
    return res.status(statuscode).json({
        success : false,
        statuscode,
        errormessage,
    });
});