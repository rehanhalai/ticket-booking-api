const seatTypeRepo = require("../repositories/seatType.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const StatusCodes = require("http-status-codes").StatusCodes;

const seatTypeService = {
    getAllSeatTypes: async () => {
        return await seatTypeRepo.getAllSeatTypes();
    },
    async getSeatTypeById(id) {
        const data = await seatTypeRepo.getSeatTypeById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.SEAT_TYPE_NOT_FOUND);
        }
        return data;
    },
    async createSeatType(seatTypeData) {
        if (!seatTypeData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.SEAT_TYPE_FIELDS_REQUIRED);
        }
        const { name, price, seatStartedAt, seatEndingAt } = seatTypeData;
        if (!name || !price || !seatStartedAt || !seatEndingAt) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.SEAT_TYPE_FIELDS_REQUIRED);
        }
        return await seatTypeRepo.createSeatType({
            seatName: name,
            ticketPrice: price,
            seatStartedAt,
            seatEndingAt,
        });
    },
    async updateSeatType(id, seatTypeData) {
        if (!seatTypeData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.SEAT_TYPE_FIELDS_REQUIRED);
        }
        const data = await seatTypeRepo.getSeatTypeById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.SEAT_TYPE_NOT_FOUND);
        }
        return await seatTypeRepo.updateSeatType(id, {
            seatName: seatTypeData.name || data.seatName,
            ticketPrice: seatTypeData.price || data.ticketPrice,
            seatStartedAt: seatTypeData.seatStartedAt || data.seatStartedAt,
            seatEndingAt: seatTypeData.seatEndingAt || data.seatEndingAt,
        });
    },
    async deleteSeatType(id) {
        const data = await seatTypeRepo.getSeatTypeById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.SEAT_TYPE_NOT_FOUND);
        }
        return await seatTypeRepo.updateSeatType(id, {
            softDelete: true,
        });
    },
};

module.exports = seatTypeService;
