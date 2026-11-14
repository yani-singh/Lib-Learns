import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    fullName: {
      type: String,
      required: true
    },

    phoneNo: {
      type: String,
      required: true
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    },

    avatar: {
      type: String
    },

    emergencyContact: {
      name: String,
      phone: String
    },

    preferredSeat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat"
    },

    currentPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan"
    },

    membershipStatus: {
      type: String,
      enum: ["active", "expired", "blocked"],
      default: "active"
    },

    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

const profileModel =mongoose.model("Profile", profileSchema);

export default profileModel
