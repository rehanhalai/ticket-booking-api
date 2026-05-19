const userService = require("../services/user.service");
const apiResponse = require("../helper/apiResponse");
const asyncHandler = require("../helper/asyncHandler");
const messages = require("../constants/messages").messages;

const userController = {
    getAllUsers: asyncHandler(async (req, res) => {
        const data = await userService.getAllUsers();
        apiResponse.success(res, messages.USER_FETCHED_SUCCESSFULLY, data);
    }),
    getUserById: asyncHandler(async (req, res) => {
        const id = req.params.id;
        const data = await userService.getUserById(id);
        apiResponse.success(res, messages.USER_FETCHED_SUCCESSFULLY, data);
    }),
    getProfile: asyncHandler(async (req, res) => {
        const { id } = req.user;
        const data = await userService.getUserById(id);
        apiResponse.success(res, messages.PROFILE_FETCHED_SUCCESSFULLY, data);
    }),
};

module.exports = userController;
