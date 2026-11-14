import jwt from "jsonwebtoken";
import userModel from "../models/User.model.js"; 
import dotenv from "dotenv";

dotenv.config();

const refreshAccesstoken = async (req,res)=>{
    try {

        const oldRefreshtoken = req.cookies.refreshToken;

        if(!oldRefreshtoken){
            return res.status(401).json({
                message:"No refresh token found"
            });
        }

        const user = await userModel.findOne({
            refreshToken: oldRefreshtoken
        });

        if(!user){
            return res.status(403).json({
                message:"User not found"
            });
        }

        jwt.verify(
            oldRefreshtoken,
            process.env.JWT_REFRESH_SECRET
        );

        const newAccessToken = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn:"15m"
            }
        );

        const newRefreshToken = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn:"7d"
            }
        );

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken",newRefreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });

        return res.status(200).json({
            message:"Tokens refreshed successfully",
            accessToken:newAccessToken
        });

    }
    catch(error){

        return res.status(403).json({
            message:"Invalid or expired refresh token"
        });

    }
};

export {refreshAccesstoken};