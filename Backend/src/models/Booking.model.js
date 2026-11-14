import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    seat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true
    },

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active"
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const bookingModel =mongoose.model("Booking", bookingSchema);

export default bookingModel
