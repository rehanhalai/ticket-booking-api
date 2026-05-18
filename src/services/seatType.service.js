const seatTypeRepo = require("../repositories/seatType.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;

const seatTypeService = {
  getAllSeatTypes: async () => {
    return await seatTypeRepo.getAllSeatTypes();
  },
  async getSeatTypeById(id) {
    const data = await seatTypeRepo.getSeatTypeById(id);
    if (!data) {
      throw new ApiError(404, messages.SEAT_TYPE_NOT_FOUND);
    }
    return data;
  },
  async createSeatType(seatTypeData) {
    if (!seatTypeData) {
      throw new ApiError(400, messages.SEAT_TYPE_FIELDS_REQUIRED);
    }
    const { name, price, seatStartedAt, seatEndingAt } = seatTypeData;
    if (!name || !price || !seatStartedAt || !seatEndingAt) {
      throw new ApiError(400, messages.SEAT_TYPE_FIELDS_REQUIRED);
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
      throw new ApiError(400, messages.SEAT_TYPE_FIELDS_REQUIRED);
    }
    const data = await seatTypeRepo.getSeatTypeById(id);
    if (!data) {
      throw new ApiError(404, messages.SEAT_TYPE_NOT_FOUND);
    }
    return await seatTypeRepo.updateSeatType(id, seatTypeData);
  },
  async deleteSeatType(id) {
    const data = await seatTypeRepo.getSeatTypeById(id);
    if (!data) {
      throw new ApiError(404, messages.SEAT_TYPE_NOT_FOUND);
    }
    return await seatTypeRepo.deleteSeatType(id);
  },
};

module.exports = seatTypeService;
