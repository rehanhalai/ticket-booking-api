const ApiResponse = require("./apiResponse");
const ApiError = require("./apiError");

const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (error instanceof ApiError) {
                return ApiResponse.error(res, error.message, error.errors, error.statusCode);
            }
            return ApiResponse.error(res, 'Internal Server Error', [error.message], 500);
        }
    };
};

module.exports = asyncHandler;