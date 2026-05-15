const userRepo = require("../repositories/user.repository")
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const { regexEmail, regexFirstUpperCase } = require("../helper/regex");
const {generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");

const authServices = {
    register : async (userData) => {
        if(!userData){
            throw new ApiError(400, messages.USER_FIELDS_REQUIRED);
        }
        const { name, email, password ,roleId} = userData;
        if (!name.trim() || !email.trim() || !password.trim() || !roleId) {
            throw new ApiError(400, messages.USER_FIELDS_REQUIRED);
        }
        if(password.length < 6){
            throw new ApiError(400, messages.PASSWORD_TOO_SHORT);
        }

        if (!regexEmail(email)) {
            throw new ApiError(400, messages.INVALID_EMAIL);
        }
        if (!regexFirstUpperCase(name)) {
            throw new ApiError(400, messages.INVALID_NAME_FORMAT);
        }

        // check if email already exists
        const existingUser = await userRepo.getUserByEmail(email);
        if (existingUser) {
            throw new ApiError(409, messages.EMAIL_ALREADY_EXISTS);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const userDataToSave = {
            name,
            email,
            passwordHash,
            role :roleId
        }
        const createdUser = await userRepo.createUser(userDataToSave);
        const token = await generateToken(createdUser);

        return { user: createdUser, tokens };
    },

    login : async (loginData) => {
        if(!loginData){
            throw new ApiError(400, messages.LOGIN_FIELDS_REQUIRED);
        }
        const { email, password } = loginData;
        if (!email.trim() || !password.trim()) {
            throw new ApiError(400, messages.LOGIN_FIELDS_REQUIRED);
        }
        const user = await userRepo.getUserByEmail(email);
        if (!user) {
            throw new ApiError(404, messages.USER_NOT_FOUND);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(401, messages.INVALID_CREDENTIALS);
        }
        const token = await generateToken(user);
        return { user, tokens };
    }
}