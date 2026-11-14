import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import seatRoutes from "./routes/seats.routes.js";
import planRoutes from "./routes/plan.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";



const app = express();

app.use(cookieParser());

app.use(cors({

    origin:"http://localhost:5173",

    credentials:true

}));

app.use(express.json());

app.get("/",(req,res)=>{

    res.send("API running");

});

app.use("/api/auth",authRoutes);
app.use("/api/booking", bookingRoutes)
app.use("/api/seats", seatRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;