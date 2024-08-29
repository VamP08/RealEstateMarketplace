import mongoose from "mongoose";
import State from "./city.model";
import city from "./city.model";

const userSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: true
    },
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
    },
    usercontact: {
        type: Number,
        required: true,
        unique: true,
    },
    cityname: {
        type: String,
        required: true,
        ref: city
    }
}, { timestamps: true } );
/* timestamps will help in storing two extra information 
    time of creation of user
    time of update of the user
    these can be used by us to sort user later */

// Pre-save hook to generate sequential userId
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.userid = await getNextSequenceValue('userid');
    }
    next();
});


const User = mongoose.model('User', userSchema);

export default User;