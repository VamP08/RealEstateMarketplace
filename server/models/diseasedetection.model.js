import mongoose from "mongoose";
import State from "./State.model";
import User from "./user.model";
import Crop from "./crop.model";
import city from "./city.model";


const detectSchema = new mongoose.Schema({
    detectid: {
        type: Number,
        required: true,
        unique: true,
    },
    detectstatus: {
        type: String,
        default: "Healthy"
    },
    diseaseid: {
        type: Number,
        required: false,
        ref: Disease
    },
    userid: {
        type: Number,
        required: true,
        ref: User
    },
    plotid: {
        type: Number,
        required: true,
        ref: User
    },
    cropid: {
        type: Number,
        required: true,
        ref: Crop
    },
    detectiondate: {
        type: Date,
        required: true,
    },
    cityname: {
        type: String,
        required: true,
        ref: User
    },
    predictedyieldloss: {
        type: Number,
    }
}); 

// Pre-save hook to generate sequential userId
detectSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.detectid = await getnext('detectid');
    }
    next();
});


const Detect = mongoose.model('Detect', detectSchema);

export default Detect;