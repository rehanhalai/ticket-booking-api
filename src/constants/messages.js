const messages = {
    NAME_REQUIRED : "fullName is required",
    EMAIL_REQUIRED : "email is required",
    SEATTYPE_REQUIRED : "seatType is required",
    SEATSTARTEDAT_REQUIRED : "startDate is required",
    SEATENDINGAT_REQUIRED : "endDate is required",

    BOOKING_FIELDS_REQUIRED : "name, email, seatNumbers, seatTypeId are required",
    SEAT_TYPE_FIELDS_REQUIRED : "name, price, seatStartedAt, seatEndingAt are required",

    BOOKING_NOT_FOUND : "booking not found",
    SEAT_TYPE_NOT_FOUND : "seat type not found",

    INVALID_EMAIL : "invalid email format",
    INVALID_NAME_FORMAT : "Name should start with an uppercase letter",
    INVALID_SEAT_TYPE : "invalid seat type",
    INVALID_SEAT_NUMBERS : "seatNumbers should be an array of numbers",
    
    EMAIL_ALREADY_EXISTS : "email already exists",
    SEAT_ALREADY_BOOKED : "one or more selected seats are already booked",

    BOOKING_FETCHED_SUCCESSFULLY : "booking fetched successfully",
    BOOKING_CREATED_SUCCESSFULLY : "booking created successfully",
    BOOKING_UPDATED_SUCCESSFULLY : "booking updated successfully",
    BOOKING_DELETED_SUCCESSFULLY : "booking deleted successfully",

    SEAT_TYPE_FETCHED_SUCCESSFULLY : "seat type fetched successfully",
    SEAT_TYPE_CREATED_SUCCESSFULLY : "seat type created successfully",
    SEAT_TYPE_UPDATED_SUCCESSFULLY : "seat type updated successfully",
    SEAT_TYPE_DELETED_SUCCESSFULLY : "seat type deleted successfully",
}

module.exports = {
    messages
}