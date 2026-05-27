const userRepository = require("../repositories/user.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const StatusCodes = require("http-status-codes").StatusCodes;

const userService = {
    getAllUsers: async () => {
        return await userRepository.getAllUsers();
    },

    getUserById: async (id) => {
        const data = await userRepository.getUserById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }
        return data;
    },
    blockUserById: async (userId) => {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }
        await userRepository.updateUser(userId, { isBlocked: true });
        return true;
    },
    unblockUserById: async (userId) => {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }
        await userRepository.updateUser(userId, { isBlocked: false, loginAttempts: 0 });
        return true;
    },
    updateLogginAttempts: async (userId, count) => {
        return userRepository.updateLoginAttempts(userId, count);
    },
    verifyPermission: async (roleId, permissionName) => {
        const isAutohrized = await userRepository.hasPermission(roleId, permissionName);
        if (!isAutohrized) {
            throw new ApiError(StatusCodes.FORBIDDEN, messages.INSUFFICIENT_PERMISSIONS);
        }
        return true;
    },
};

module.exports = userService;
