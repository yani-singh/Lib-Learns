import userModel from "../models/User.model.js";
import {sendVerificationEmail,sendResetPasswordEmail} from "../Utils/email.utils.js";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { raw } from "express";

dotenv.config();

// ==================================================== Register ===========================================================


const RegisterUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Error("user alredy exist");
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const rawToken = crypto.randomBytes(32).toString("hex");
    // console.log('rawToken:', rawToken);
    
    const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
    
    // console.log('hashedToken:', hashedToken);
    const tokenExpire = Date.now() + 10 * 60 * 1000; // 10 min

    const newUser = await userModel.create({
      email,
      password: hashPassword,
      verificationToken: hashedToken,
      verificationTokenExpire: tokenExpire
    });

    const verificationURL = `${process.env.BACKEND_URL}/api/auth/verify-email?verificationToken=${rawToken}`;

    await sendVerificationEmail(email, verificationURL);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



// ==================================================== Login ===========================================================

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    if (!user.isVerified) {
        return res.status(403).json({
            message: "Please verify your email first"
        });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(  
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "2d" }
        );

        

    const refreshToken = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
        );
    
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,        
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000
        });


    return res.status(200).json({
      message: "login sucessful",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};



// ==================================================== Logout ===========================================================


const LogoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;  
        if (!refreshToken) {
            return res.status(400).json({
                message: "No refresh token found",
            });
        }

        const user = await userModel.findOne({ refreshToken });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.refreshToken = undefined;
        await user.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};  




// ====================================================Email verification===========================================================




const verifyEmail = async(req,res)=>{
    try {
        const {verificationToken} = req.query;

        if(!verificationToken){  
            return res.status(404).json({
                message:"invalid verification token"
            })
        }

        const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

        const user = await userModel.findOne({ verificationToken: hashedToken ,verificationTokenExpire: { $gt: Date.now() } });


        if(!user){
            return res.status(404).json({
                message:"token expired or invalid token"
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email already verified"
            });
        }


        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;

        await user.save();

        return res.status(200).json({
            message:"Email verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }   
}


// ==================================================== Forget Password ===========================================================

const forgotPassword = async(req,res)=>{

    try {
        const {email} = req.body; 
        if(!email){
            return res.status(400).json({
                message:"email is required"
            })
        }
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const rawToken = crypto.randomBytes(32).toString("hex");  
        
        const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

        const tokenExpire = Date.now() + 10 * 60 * 1000; // 10 min

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = tokenExpire;


        await user.save();


        const resetURL = `${process.env.BACKEND_URL}/api/auth/reset-password?token=${rawToken}`; 
        await sendResetPasswordEmail(email, resetURL);

        return res.status(200).json({
            message:"Password reset email sent"
        })  

      }  


      catch (error) {
        return res.status(500).json({
            message: error.message
        })  
      }
  }



// ==================================================== Reset-password ===========================================================

const resetPassword = async(req,res)=>{
    try {
        const {token} = req.query;
        const {newPassword} = req.body;
        console.log(newPassword)
        if(!token){
            return res.status(400).json({
                message:"Invalid or missing token"
            })
        }
        const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const user = await userModel.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });

        if(!user){
            return res.status(400).json({
                message:"Invalid or expired token"
            })
        } 

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        

        console.log(hashPassword)

        return res.status(200).json({
            message:"Password reset successful"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}




// ==================================================== Export all controllers ===========================================================


export { RegisterUser, LoginUser, LogoutUser, verifyEmail ,forgotPassword, resetPassword};

