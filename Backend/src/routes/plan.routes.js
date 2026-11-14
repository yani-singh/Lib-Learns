import { createPlan ,getPlans,updatePlan,deletePlan } from "../controllers/plan.controller.js";

import authentication from "../middleware/Authentication.middleware.js";
import { authorizeRoles } from "../middleware/Authorisation.middleware.js";

import express from "express";

const router = express.Router();

router.post("/create-plan", authentication, authorizeRoles("ADMIN"), createPlan);
router.get("/get-plans", authentication, getPlans);
router.patch("/update-plan/:id", authentication, authorizeRoles("ADMIN"), updatePlan);
router.delete("/delete-plan/:id", authentication, authorizeRoles("ADMIN"), deletePlan);

export default router;