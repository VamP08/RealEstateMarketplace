import mongoose from "mongoose";

const disSchema = new mongoose.Schema({
    diseaseid: {
        type: Number,
        required: true,
        unique: true,
    },
    diseasename: {
        type: String,
        required: true,
        unique: true,
    },
    diseasedesc: {
        type: String,
        required: true,
    },
    diseasesymptoms: {
        type: String,
        required: true,
    },
    diseaseprevention: {
        type: String,
        required: true,
    }
    
}, { timestamps: true } );
/* timestamps will help in storing two extra information 
    time of creation of disease
    time of update of the disease
    these can be used by us to sort disease later */

// Pre-save hook to generate sequential diseasid
disSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.diseasid = await getNextSequenceValue('diseaseid');
    }
    next();
});


const Disease = mongoose.model('Disease', disSchema);

export default Disease;