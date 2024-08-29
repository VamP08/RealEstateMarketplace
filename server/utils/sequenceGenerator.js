import Counter from './counter.model.js';

async function getNextSequenceValue(sequenceName) {
    try {
        const counter = await Counter.findOneAndUpdate(
            { id: sequenceName },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        return counter.seq;
    } catch (error) {
        throw new Error('Error in generating sequence: ' + error.message);
    }
}
