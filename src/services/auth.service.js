const userRepo = require("../repositories/user.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const { regexEmail, regexFirstUpperCase } = require("../helper/regex");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const StatusCodes = require("http-status-codes").StatusCodes;
const roleRepo = require("../repositories/role.repository");

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
        const role = roleRepo.fetchById(roleId);
        if(!role) throw new ApiError(StatusCodes.BAD_REQUEST,messages.ROLE_NOT_FOUND)

        const passwordHash = await bcrypt.hash(passwordVal, 10);
        const userDataToSave = {
            name: nameTrim,
            email: emailTrim,
            passwordHash,
            role,
        };
        const createdUser = await userRepo.createUser(userDataToSave);
        const token = await generateToken(createdUser);

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
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, messages.INVALID_CREDENTIALS);
        }
        const token = await generateToken(user);
        return { token };
    },
};

module.exports = authServices;
