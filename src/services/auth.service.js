const userRepo = require("../repositories/user.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const { regexEmail, regexFirstUpperCase } = require("../helper/regex");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const StatusCodes = require("http-status-codes").StatusCodes;
const roleRepo = require("../repositories/role.repository");
const userService = require("./user.service");

const authServices = {
    register: async (userData) => {
        if (!userData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.USER_FIELDS_REQUIRED);
        }
        const { name, email, password, roleId } = userData;
        const nameTrim = name ? name.trim() : "";
        const emailTrim = email ? email.trim() : "";
        const passwordVal = password ? password : "";

        if (!nameTrim || !emailTrim || !passwordVal || !roleId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.USER_FIELDS_REQUIRED);
        }

        if (passwordVal.length < 6) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.PASSWORD_TOO_SHORT);
        }

        if (!regexEmail(emailTrim)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.INVALID_EMAIL);
        }
        if (!regexFirstUpperCase(nameTrim)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.INVALID_NAME_FORMAT);
        }

        // check if email already exists
        const existingUser = await userRepo.getUserByEmail(email);
        if (existingUser) {
            throw new ApiError(StatusCodes.CONFLICT, messages.EMAIL_ALREADY_EXISTS);
        }
        const role = await roleRepo.fetchById(roleId);
        if (!role) throw new ApiError(StatusCodes.BAD_REQUEST, messages.ROLE_NOT_FOUND);

        const passwordHash = await bcrypt.hash(passwordVal, 10);
        const userDataToSave = {
            name: nameTrim,
            email: emailTrim,
            passwordHash,
            roleId: roleId,
        };
        const createdUser = await userRepo.createUser(userDataToSave);
        const token = await generateToken({ id: createdUser.id, roleId: roleId });

        return { token };
    },

    login: async (loginData) => {
        if (!loginData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.LOGIN_FIELDS_REQUIRED);
        }
        const { email, password } = loginData;
        if (!email || !password) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.LOGIN_FIELDS_REQUIRED);
        }
        const user = await userRepo.getUserByEmail(email);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }
        if (user.isBlocked) {
            throw new ApiError(StatusCodes.FORBIDDEN, messages.USER_BLOCKED);
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            if (user.loginAttempts >= 5) {
                await userService.blockUserById(user.id);
                throw new ApiError(StatusCodes.FORBIDDEN, messages.LOGIN_ATTEMPTS_EXCEEDED);
            }
            await userRepo.updateLoginAttempts(user.id, (user.loginAttempts || 0) + 1);
            throw new ApiError(StatusCodes.UNAUTHORIZED, messages.INVALID_CREDENTIALS);
        }
        await userRepo.updateLoginAttempts(user.id, 0);
        const token = await generateToken({ id: user.id, roleId: user.roleId });
        return { token };
    },
};

module.exports = authServices;
