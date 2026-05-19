const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // delegate to centralized error handler
            return next(error);
        }
    };
};

module.exports = asyncHandler;
