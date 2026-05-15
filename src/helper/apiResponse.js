class ApiResponse {
    constructor(statusCode, success, message, data = null, errors = null) {
        if (data !== null) this.data = data;
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        if (errors !== null) this.errors = errors;
    }

    static success(res, message, data = null, statusCode = 200) {
        const response = new ApiResponse(statusCode, true, message, data);
        return res.status(statusCode).json(response);
    }

    static error(res, message, errors = null, statusCode = 500) {
        const response = new ApiResponse(statusCode, false, message, null, errors);
        return res.status(statusCode).json(response);
    }
}

module.exports = ApiResponse;
