import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
{
    seatNumber:{
        type:String,
        required:true,
        unique:true
    },

    row:{
        type:String,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    },

    isBooked:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

const seatModel = mongoose.model("Seat",seatSchema);

export default seatModel;