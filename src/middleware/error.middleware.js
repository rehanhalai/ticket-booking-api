const ApiResponse = require("../helper/apiResponse");
const ApiError = require("../helper/apiError");

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        const status = err.statusCode || 500;
        const msg = err.message || "Error";
        const errors = err.errors || null;
        return ApiResponse.error(res, msg, errors, status);
    }

    let errMsg =
        err && err.message ? String(err.message) : err ? String(err) : "Internal Server Error";
    if (!errMsg || (typeof errMsg === "string" && errMsg.trim() === ""))
        errMsg = "Internal Server Error";

    return ApiResponse.error(res, "Internal Server Error", [errMsg], 500);
}

module.exports = { errorHandler };
