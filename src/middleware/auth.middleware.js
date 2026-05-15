const jwt = require("jsonwebtoken")
const ApiError = require("../helper/apiError")

function verifyToken (req,res,next) {
    const token = req.headers["authorization"];
    if (!token) {
        return ApiError(401, "No token provided");
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }catch(error){
        return ApiError(401, "Invalid token");
    }
}