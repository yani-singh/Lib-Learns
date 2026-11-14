import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        unique: true
    },

    durationType: {
        type: String,
        enum: ["hourly", "daily", "monthly", "quarterly"],
        required: true
    },

    durationValue: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    features: [{
        type: String
    }],

    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

const planModel = mongoose.model("Plan", planSchema);

export default planModel;