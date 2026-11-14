import { createSeat,getSeats,updateSeat,deleteSeat } from "../controllers/Seat.Controller.js";
import authentication from "../middleware/Authentication.middleware.js";
import { authorizeRoles } from "../middleware/Authorisation.middleware.js";

import express from "express";

const router = express.Router();    

router.post("/create-seat", authentication, authorizeRoles("ADMIN"), createSeat);
router.get("/get-seats", authentication, getSeats);
router.patch("/update-seat/:id", authentication, authorizeRoles("ADMIN"), updateSeat);
router.delete("/delete-seat/:id", authentication, authorizeRoles("ADMIN"), deleteSeat); 

export default router;
