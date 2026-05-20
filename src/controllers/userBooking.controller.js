const userBookingServices = require("../services/booking.service");
const asyncHandler = require("../helper/asyncHandler");
const ApiResponse = require("../helper/apiResponse");
const messages = require("../constants/messages");
const bookingEmitter = require("../emitter/booking.emitter");

const UserController = {
    getAllBookings: asyncHandler(async (req, res) => {
        const data = await userBookingServices.getAllBookings();
        ApiResponse.success(res, messages.BOOKING_FETCHED_SUCCESSFULLY, data);
    }),

    getBookingById: asyncHandler(async (req, res) => {
        const data = await userBookingServices.getBookingById(req.params.id);
        ApiResponse.success(res, messages.BOOKING_FETCHED_SUCCESSFULLY, data);
    }),

    getBookingsByEmmiter: asyncHandler(async (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream'); // Or 'text/event-stream' for SSE
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Cache-Control', 'no-cache');

        res.write('event: bookingStream\n');

        bookingEmitter.on("booking:created", async (data) => {
            try {
                const bookings = await userBookingServices.getAllBookingByUserId(req.user.id);
                res.write("event : bookingLcreated\n");
                res.write(`data: ${JSON.stringify(bookings)}\n\n`);
            } catch (error) {
                console.error("booking:created listener error", error.message);
            }
        });

        req.on('close', () => {
            console.log('Client disconnected from booking stream');
        })
    }),

    createBooking: asyncHandler(async (req, res) => {
        const payload = { ...req.body, user: req.user };
        const data = await userBookingServices.createBooking(payload);
        ApiResponse.success(res, messages.BOOKING_CREATED_SUCCESSFULLY, data);
    }),

    updateBooking: asyncHandler(async (req, res) => {
        const payload = { ...req.body, user: req.user };
        const data = await userBookingServices.updateBooking(req.params.id, payload);
        ApiResponse.success(res, messages.BOOKING_UPDATED_SUCCESSFULLY, data);
    }),

    deleteBooking: asyncHandler(async (req, res) => {
        const payload = { id: req.params.id, user: req.user };
        const data = await userBookingServices.deleteBooking(payload);
        ApiResponse.success(res, messages.BOOKING_DELETED_SUCCESSFULLY, data);
    }),
};

module.exports = UserController;
