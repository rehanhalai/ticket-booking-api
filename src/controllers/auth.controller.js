const asyncHandler = require("../helper/asyncHandler");
const authServices = require("../services/auth.service");
const ApiResponse = require("../helper/apiResponse");

const authController = {
  login: asyncHandler(async (req, res) => {
    const data = await authServices.login(req.body);
    ApiResponse.success(res, "Login successful", data);
  }),
  register: asyncHandler(async (req, res) => {
    const data = await authServices.register(req.body);
    ApiResponse.success(res, "Registration successful", data);
  }),
};

module.exports = authController;
