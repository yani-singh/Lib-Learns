import seatModel from "../models/Seat.model.js";
import planModel from "../models/Plan.model.js";
import bookingModel from "../models/Booking.model.js";

const getDashboardData = async (req,res)=>{

    try {

        const totalSeats = await seatModel.countDocuments();

        const activeSeats = await seatModel.countDocuments({
            isActive:true
        });

        const totalPlans = await planModel.countDocuments();

        const activeBookings = await bookingModel.countDocuments({
            status:"active"
        });

        res.status(200).json({

            totalSeats,

            activeSeats,

            totalPlans,

            activeBookings

        });

    }
    catch(error){

        return res.status(500).json({
            message:error.message
        });

    }

};

export {
    getDashboardData
};