import mongoose from "mongoose";
import Crop from "./crop.model";
import Disease from "./disease.model";
import User from "./user.model";
import Detect from "./diseasedetection.model";

const PlotSchema = new mongoose.Schema({
    Plotid: {
        type: Number,
        required: true,
        unique: true
    },
    userid: {
        type: Number,
        required: true,
        ref: User
    },
    cropid: {
        type: Number,
        required: true,
        ref: Crop
    },
    detectstatus: {
        type: String,
        ref: Detect
    } 
    
});

// Pre-save hook to generate sequential plotid
PlotSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.plotid = await getNextSequenceValue('plotid');
    }
    next();
});



const Plot = mongoose.model('Plot', PlotSchema);

export default Plot;