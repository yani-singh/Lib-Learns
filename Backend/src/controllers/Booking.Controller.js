import bookingModel from '../models/Booking.model.js';
import seatModel from '../models/Seat.model.js';
import planModel from '../models/Plan.model.js';

const createBooking = async (req,res)=>{

    try {

        const {seatId,planId} = req.body;

        const seat = await seatModel.findById(seatId);

        const plan = await planModel.findById(planId);

        if(!seat || !plan){

            return res.status(404).json({
                message:"Seat or Plan not found"
            });

        }

        // ---------------- START TIME ----------------

        const startTime = new Date();

        const endTime = new Date(startTime);

        // ---------------- PLAN LOGIC ----------------

        if(plan.durationType === "hourly"){

            endTime.setHours(
                startTime.getHours() + plan.durationValue
            );

        }

        if(plan.durationType === "daily"){

            endTime.setDate(
                startTime.getDate() + plan.durationValue
            );

        }

        if(plan.durationType === "monthly"){

            endTime.setMonth(
                startTime.getMonth() + plan.durationValue
            );

        }

        if(plan.durationType === "quarterly"){

            endTime.setMonth(
                startTime.getMonth() + 3
            );

        }

        // ---------------- CONFLICT CHECK ----------------

        const conflict = await bookingModel.findOne({

            seat: seatId,

            status: "active",

            startTime: { $lt: endTime },

            endTime: { $gt: startTime }

        });

        if(conflict){

            return res.status(400).json({
                message:"Seat already booked for selected time"
            });

        }

        // ---------------- CREATE BOOKING ----------------

        const booking = await bookingModel.create({

            seat: seatId,

            plan: planId,

            user: req.user.id,

            startTime,

            endTime

        });

        return res.status(201).json({

            message:"Booking created successfully",

            booking

        });

    }
    catch(error){

        return res.status(500).json({

            message:"Internal server error",

            error:error.message

        });

    }

};

        // ---------------- GET USER BOOKINGS ----------------

const getUserBookings = async (req,res)=>{

    try {

        const bookings = await bookingModel
        .find({
            user:req.user.id
        })
        .populate("seat")
        .populate("plan");

        return res.status(200).json({

            message:"Bookings fetched successfully",

            bookings

        });

    }
    catch(error){

        return res.status(500).json({

            message:"Internal server error",

            error:error.message

        });

    }

};

    // ---------------- CANCEL BOOKING ----------------

const cancelBooking = async (req,res)=>{

    try {

        const bookingId = req.params.id;

        const booking = await bookingModel.findOne({

            _id: bookingId,

            user: req.user.id

        });

        if(!booking){

            return res.status(404).json({

                message:"Booking not found"

            });

        }

        booking.status = "cancelled";

        await booking.save();

        return res.status(200).json({

            message:"Booking cancelled successfully"

        });

    }
    catch(error){

        return res.status(500).json({

            message:"Internal server error",

            error:error.message

        });

    }

};

// ---------------- EXPORT CONTROLLER FUNCTIONS ----------------

export {
    createBooking,
    getUserBookings,
    cancelBooking,
};
