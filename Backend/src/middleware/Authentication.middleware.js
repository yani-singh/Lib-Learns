import jwt from "jsonwebtoken";
import dotenv from "dotenv";        
dotenv.config();

const authenticUser = (req, res, next) => {
    let token;

    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    } 
    else if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        });
    }   


    try {   
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    }   

    
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access token expired"
            });
        }

        return res.status(401).json({
            message: "Invalid token"
        });
    }
 
}

export default authenticUser;