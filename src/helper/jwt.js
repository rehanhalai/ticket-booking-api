const jwt = require("jsonwebtoken");
const ApiError = require("./apiError");

async function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
}

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return req.user = {
            id: decoded.id,
            role: decoded.role,
        };
    } catch (error) {
        return new ApiError(401, "Invalid or expired token");
    }
}

module.exports = { generateToken, verifyToken };
