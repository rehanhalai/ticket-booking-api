const jwt = require("jsonwebtoken");
const ApiError = require("./apiError");
const { StatusCodes } = require("http-status-codes");

async function generateToken({id, roleId }) {

    if(typeof roleId !== "number"){
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE,"role must be a number for token generation")
    }

    const payload = {
        id: id,
        roleId: roleId,
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
            roleId: decoded.roleId,
        };
    } catch (error) {
        return new ApiError(401, "Invalid or expired token");
    }
}

module.exports = { generateToken, verifyToken };
