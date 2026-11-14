import planModel from "../models/Plan.model.js";

const createPlan = async (req,res)=>{

    try {  
        const {name,durationType,durationValue,price} = req.body;

        const existingPlan = await planModel.findOne({
            name
        });

        if(existingPlan){
            return res.status(400).json({
                message: "Plan with this name already exists"
            });
        }

        const newPlan = new planModel({
            name,
            durationType,
            durationValue,
            price
        });

        await newPlan.save();

        res.status(201).json({
            message: "Plan created successfully",
            plan: newPlan
        });
    } 
    catch (error) {
        console.error("Error creating plan:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getPlans = async (req,res)=>{

    try {
        const plans = await planModel.find();
        res.status(200).json({
            message: "Plans fetched successfully",
            plans
        });
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({  
            message: "Internal server error"
        });
    }
};

const updatePlan = async (req,res)=>{
    try {   
        const {id} = req.params;

        const {name,durationType,durationValue,price} = req.body;
        const plan = await planModel.findById(id);

        if(!plan){
            return res.status(404).json({
                message:"Plan not found"
            });
        }
        plan.name = name || plan.name;  
        plan.durationType = durationType || plan.durationType;
        plan.durationValue = durationValue || plan.durationValue;
        plan.price = price || plan.price;
        await plan.save();

        res.status(200).json({
            message:"Plan updated successfully",
            plan
        });
    } 
    catch (error) {
        console.error("Error updating plan:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deletePlan = async (req,res)=>{

    try {

        const {id} = req.params;

        const deletedPlan = await planModel.findByIdAndDelete(id);

        if(!deletedPlan){

            return res.status(404).json({
                message:"Plan not found"
            });

        }

        return res.status(200).json({
            message:"Plan deleted successfully"
        });

    }
    catch(error){

        return res.status(500).json({
            message:error.message
        });

    }

};

export { createPlan, getPlans, updatePlan, deletePlan };