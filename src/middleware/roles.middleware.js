const ApiError = require("../helper/apiError");

function verifyRole(...roles) {
    return function (req, res, next) {
        if (!req.user || !req.user.role) {
            return next(new ApiError(403, "Unauthorized"));
        }
        const allowedRoles = roles.flat().map((r) => String(r));
        if (!allowedRoles.includes(String(req.user.role))) {
            return next(new ApiError(403, "Insufficient permissions"));
        }
        next();
    };
}

module.exports = {
    verifyRole,
};
