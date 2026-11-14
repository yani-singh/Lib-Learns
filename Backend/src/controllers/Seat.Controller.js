import seatModel from "../models/Seat.model.js";

const createSeat = async (req,res)=>{

    try {
        const {seatNumber,row} = req.body;

        const existingSeat = await seatModel.findOne({
            seatNumber
        }); 
        if(existingSeat){
            return res.status(400).json({
                message:"Seat number already exists"
            });
        }
        const seat = await seatModel.create({ 
            seatNumber,
            row 
            }); 


        return res.status(201).json({
            message:"Seat created successfully",
            seat 
        });


    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }
};

const getSeats = async (req,res)=>{

    try {   
        const seats = await seatModel.find();

        return res.status(200).json({
            message:"Seats fetched successfully",
            seats
        });

    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }
};

const updateSeat = async (req,res)=>{

    try {

        const {id} = req.params;

        const {seatNumber,row} = req.body;

        const seat = await seatModel.findById(id);

        if(!seat){

            return res.status(404).json({
                message:"Seat not found"
            });

        }

        // Check duplicate seat number

        const existingSeat = await seatModel.findOne({

            seatNumber,

            _id: { $ne: id }

        });

        if(existingSeat){

            return res.status(400).json({
                message:"Seat number already exists"
            });

        }

        seat.seatNumber = seatNumber || seat.seatNumber;

        seat.row = row || seat.row;

        await seat.save();

        return res.status(200).json({

            message:"Seat updated successfully",

            seat

        });

    }
    catch(error){

        return res.status(500).json({
            message:error.message
        });

    }

};


const deleteSeat = async (req,res)=>{   
    try {
        const {id} = req.params;
        const seat = await seatModel.findById(id);
        
        if(!seat){
            return res.status(404).json({
                message:"Seat not found"
            });
        }

        await seatModel.findByIdAndDelete(id);

        return res.status(200).json({
            message:"Seat deleted successfully"
        });
    
    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }       


};

export {
    createSeat,
    getSeats,
    updateSeat,
    deleteSeat
};