const { messages } = require("../constants/messages");
const ApiError = require("../helper/apiError");
const userService = require("../services/user.service");
const { StatusCodes } = require("http-status-codes");

function verifyPermission(requiredPermission) {
    if (!requiredPermission || typeof requiredPermission !== "string") {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Required permission must be a non-empty string");
    }
    return async function (req, res, next) {
        if (!req.user || !req.user.roleId) {
            return next(new ApiError(StatusCodes.UNAUTHORIZED, messages.UNAUTHORIZED));
        }
        try{
            await userService.verifyPermission(req.user.roleId, requiredPermission);
            next();
        }catch(error){
            next(error);
        }
    };
}

module.exports = {
    verifyPermission,
};
