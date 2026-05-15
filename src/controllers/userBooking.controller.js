const userBookingServices = require("../services/booking.services");
const asyncHandler = require("../helper/asyncHandler");
const ApiResponse = require("../helper/apiResponse");
const messages = require("../constants/messages");

const UserController = {
    getAllBookings: asyncHandler(async (req, res) => {
        const data = await userBookingServices.getAllBookings();
        ApiResponse.success(res, messages.BOOKING_FETCHED_SUCCESSFULLY, data);
    }),

    getBookingById: asyncHandler(async (req, res) => {
        const data = await userBookingServices.getBookingById(req.params.id);
        ApiResponse.success(res, messages.BOOKING_FETCHED_SUCCESSFULLY, data);
    }),

    createBooking: asyncHandler(async (req, res) => {
        const data = await userBookingServices.createBooking(req.body);
        ApiResponse.success(res, messages.BOOKING_CREATED_SUCCESSFULLY, data);
    }),

    updateBooking: asyncHandler(async (req, res) => {
        const data = await userBookingServices.updateBooking(req.params.id, req.body);
        ApiResponse.success(res, messages.BOOKING_UPDATED_SUCCESSFULLY, data);
    }),

    deleteBooking: asyncHandler(async (req, res) => {
        const data = await userBookingServices.deleteBooking(req.params.id);
        ApiResponse.success(res, messages.BOOKING_DELETED_SUCCESSFULLY, data);
    })
};

module.exports = UserController;