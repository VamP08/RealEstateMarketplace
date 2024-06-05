import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test =(req,res) => {
    res.json({
        message:'API test route is working',
    });
};

export const updateUser = async (req,res) => {
    if (req.user.id !== req.params.id) return next(errorhandler(401,'You can only update your own account'))
    try {
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await  User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest); 
    }catch (error){
        next(error)
    }
}