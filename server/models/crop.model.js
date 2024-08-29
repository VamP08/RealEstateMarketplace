import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    cropid: {
        type: Number,
        required: true,
        unique: true,
        required: true
    },
    cropname: {
        type: String,
        required: true,
    },
    optimalseason: {
        type: String,
        required: true
    },
    cropsowingdate: {
        type: Date,
        required: true,
    }
    
}, { timestamps: true } );
/* timestamps will help in storing two extra information 
    time of creation of crop
    time of update of the crop
    these can be used by us to sort crop later */

// Pre-save hook to generate sequential cropid
cropSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.cropid = await getNextSequenceValue('cropid');
    }
    next();
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;