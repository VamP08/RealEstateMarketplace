import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"
    }
    
}, { timestamps: true } );
/* timestamps will help in storing two extra information 
    time of creation of user
    time of update of the user
    these can be used by us to sort user later */

const User = mongoose.model('User', userSchema);

export default User;