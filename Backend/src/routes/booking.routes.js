import express from "express";
const router = express.Router();

import { createBooking ,getUserBookings,cancelBooking } from "../controllers/Booking.Controller.js";

import authenticUser  from "../middleware/Authentication.middleware.js";


router.post("/create-booking", authenticUser, createBooking);
router.get("/my-booking", authenticUser, getUserBookings);
router.delete("/cancel-booking/:id", authenticUser, cancelBooking);


export default router;


