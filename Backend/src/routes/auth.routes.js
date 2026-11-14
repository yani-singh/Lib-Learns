import express from "express";
import { RegisterUser, LoginUser ,LogoutUser, verifyEmail, forgotPassword, resetPassword} from "../controllers/auth.Controller.js"
import { refreshAccesstoken } from "../controllers/Refresh.Controller.js";
import { authorizeRoles } from "../middleware/Authorisation.middleware.js";

import authentication from "../middleware/Authentication.middleware.js";

const router = express.Router();   

router.post("/register", RegisterUser);
router.get("/verify-email", verifyEmail);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.post("/refresh", refreshAccesstoken);
router.post("/forgot-password", forgotPassword);    
router.patch("/reset-password", resetPassword);


router.get("/admin", authentication, authorizeRoles("ADMIN"), (req, res) => {
    console.log(res.user)
    res.json({ message: "Welcome, admin! You have access to this route." });
});

router.get("/profile", authentication, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}! This is your profile.` });
});



export default router;


