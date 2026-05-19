const messages = {
    NAME_REQUIRED: "fullName is required",
    EMAIL_REQUIRED: "email is required",
    SEATTYPE_REQUIRED: "seatType is required",
    SEATSTARTEDAT_REQUIRED: "startDate is required",
    SEATENDINGAT_REQUIRED: "endDate is required",
    USER_FIELDS_REQUIRED: "name, email, roleId and password are required",
    LOGIN_FIELDS_REQUIRED: "email and password are required",
    DISCOUNT_FIELDS_REQUIRED: "name, minimumTicketCount and percentage are required",

    BOOKING_FIELDS_REQUIRED: "seatNumbers and seatTypeId are required",
    SEAT_TYPE_FIELDS_REQUIRED: "name, price, seatStartedAt, seatEndingAt are required",

    BOOKING_NOT_FOUND: "booking not found",
    SEAT_TYPE_NOT_FOUND: "seat type not found",
    USER_NOT_FOUND: "user not found",
    DISCOUNT_NOT_FOUND: "discount not found",

    INSUFFICIENT_PERMISSIONS: "you do not have permission to perform this action",

    INVALID_CREDENTIALS: "invalid credentials",
    INVALID_EMAIL: "invalid email format",
    INVALID_NAME_FORMAT: "Name should start with an uppercase letter",
    INVALID_SEAT_TYPE: "invalid seat type",
    INVALID_SEAT_NUMBERS: "seatNumbers should be an array of numbers",

    PASSWORD_TOO_SHORT: "password should be at least 6 characters long",

    EMAIL_ALREADY_EXISTS: "email already exists",
    SEAT_ALREADY_BOOKED: "one or more selected seats are already booked",

    USER_CREATED_SUCCESSFULLY: "user created successfully",
    USER_FETCHED_SUCCESSFULLY: "user fetched successfully",
    USER_UPDATED_SUCCESSFULLY: "user updated successfully",
    USER_DELETED_SUCCESSFULLY: "user deleted successfully",

    LOGIN_SUCCESSFUL: "login successful",
    REGISTER_SUCCESSFUL: "registration successful",

    BOOKING_FETCHED_SUCCESSFULLY: "booking fetched successfully",
    BOOKING_CREATED_SUCCESSFULLY: "booking created successfully",
    BOOKING_UPDATED_SUCCESSFULLY: "booking updated successfully",
    BOOKING_DELETED_SUCCESSFULLY: "booking deleted successfully",

    SEAT_TYPE_FETCHED_SUCCESSFULLY: "seat type fetched successfully",
    SEAT_TYPE_CREATED_SUCCESSFULLY: "seat type created successfully",
    SEAT_TYPE_UPDATED_SUCCESSFULLY: "seat type updated successfully",
    SEAT_TYPE_DELETED_SUCCESSFULLY: "seat type deleted successfully",

    DISCOUNT_CREATED_SUCCESSFULLY: "discount created successfully",
    DISCOUNT_UPDATED_SUCCESSFULLY: "discount updated successfully",
    DISCOUNT_DELETED_SUCCESSFULLY: "discount deleted successfully",
};

module.exports = {
    messages,
};
