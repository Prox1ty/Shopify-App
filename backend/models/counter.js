import { model, Schema } from 'mongoose';

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequenceValue: { 
        type: Number,
        default: 0
    }
});

export const Counter = model("counter", counterSchema);