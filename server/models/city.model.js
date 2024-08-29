import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityid: {
        type: Number,
        required: true,
        unique: true,
    },
    cityname: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true } );
/* timestamps will help in storing two extra information 
    time of creation of state
    time of update of the state
    these can be used by us to sort state later */

// Pre-save hook to generate sequential cityid
citySchema.pre('save', async function (next) {
    if (this.isNew) {
        this.cityid = await getNextSequenceValue('cityid');
    }
    next();
});


const city = mongoose.model('city', citySchema);

export default city;