import { getDashboardData } from "../controllers/Dashboard.Controller.js";
import authentication from "../middleware/Authentication.middleware.js";
import { authorizeRoles } from "../middleware/Authorisation.middleware.js";

import express from "express";

const router = express.Router();

router.get("/Dashboard", authentication, authorizeRoles("ADMIN"), getDashboardData);

export default router;
