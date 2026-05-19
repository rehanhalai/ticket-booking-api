const seatTypeService = require("../services/seatType.service");
const asyncHandler = require("../helper/asyncHandler");
const ApiResponse = require("../helper/apiResponse");
const { messages } = require("../constants/messages");

const seatTypeController = {
    getAllSeatTypes: asyncHandler(async (req, res) => {
        const data = await seatTypeService.getAllSeatTypes();
        ApiResponse.success(res, messages.SEAT_TYPE_FETCHED_SUCCESSFULLY, data);
    }),

    getSeatTypeById: asyncHandler(async (req, res) => {
        const data = await seatTypeService.getSeatTypeById(req.params.id);
        ApiResponse.success(res, messages.SEAT_TYPE_FETCHED_SUCCESSFULLY, data);
    }),

    createSeatType: asyncHandler(async (req, res) => {
        const data = await seatTypeService.createSeatType(req.body);
        ApiResponse.success(res, messages.SEAT_TYPE_CREATED_SUCCESSFULLY, data);
    }),

    updateSeatType: asyncHandler(async (req, res) => {
        const data = await seatTypeService.updateSeatType(req.params.id, req.body);
        ApiResponse.success(res, messages.SEAT_TYPE_UPDATED_SUCCESSFULLY, data);
    }),

    deleteSeatType: asyncHandler(async (req, res) => {
        const data = await seatTypeService.deleteSeatType(req.params.id);
        ApiResponse.success(res, messages.SEAT_TYPE_DELETED_SUCCESSFULLY, data);
    }),
};

module.exports = seatTypeController;
