const asyncHandler = require("../helper/asyncHandler");
const authServices = require("../services/auth.service");
const ApiResponse = require("../helper/apiResponse");
const { messages } = require("../constants/messages");

const authController = {
    login: asyncHandler(async (req, res) => {
        const data = await authServices.login(req.body);
        ApiResponse.success(res, messages.LOGIN_SUCCESSFUL, data);
    }),
    register: asyncHandler(async (req, res) => {
        const data = await authServices.register(req.body);
        ApiResponse.success(res, messages.REGISTER_SUCCESSFUL, data);
    }),
};

module.exports = authController;
