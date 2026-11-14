import mongoose  from "mongoose";


const User = new mongoose.Schema({

    email:{
        type:String,
        reqiured:true,
        unique:true,
        lowercase:true
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    password:{
        type:String,
        reqiured:true,
        unique:true
    },

    isVerified:{
        type:Boolean,
        reqiured:true,
        default:false
    },

    isLogged: {
      type: String,
      enum: ["active", "deactive"],
      default: "active"
    },

    refreshToken: {
        type: String
    },

    verificationToken:String,
    verificationTokenExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

const userModel= mongoose.model("Users",User)

export default userModel