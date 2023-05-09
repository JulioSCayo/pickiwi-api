import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    user_id: {
        required: false,
        type: String
    },
    company: {
        required: false,
        type: String
    },
    type_of_kiwi: {
        required: false,
        type: String
    },
    smoko_time: {
        required: false,
        type: Number
    },
    lunch_time: {
        required: false,
        type: Number
    },
    hours: {
        required: false,
        type: Number
    },
    bins: {
        required: true,
        type: Number
    },
    hourly_payment: {
        required: false,
        type: Number
    },
    bin_payment: {
        required: true,
        type: Number
    },
    members: {
        required: true,
        type: Number
    },
    payment: {
        required: true,
        type: Number
    },
    payment_day: {
        required: false,
        type: Date
    },
    paid: {
        required: false,
        type: Boolean
    }
},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Record', recordSchema);