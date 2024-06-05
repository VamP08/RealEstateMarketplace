import User from "../models/user.model";
import { errorhandler } from "../utils/error";
import bcryptjs from 'bcryptjs';

export const test =(req,res) => {
    res.json({
        message:'API test route is working',
    });
};

export const updateUser = (req,res) => {
    if (req.user.id !== req.params.id) return next(errorhandler(401,'You can only update your own account'))
    try {
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await  User.findByIdAndUpdate(req.params.id, )
    }catch (error){
        next(error)
    }
}