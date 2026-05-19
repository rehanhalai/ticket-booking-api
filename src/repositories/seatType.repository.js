const seatTypeModel = require("../models/seatType.model");

const SeatTypeRepository = {
    getAllSeatTypes: async () => {
        return await seatTypeModel.findAll({
            where: {
                softDelete: false,
            },
        });
    },

    getSeatTypeById: async (id) => {
        return await seatTypeModel.findOne({
            where: {
                id,
                softDelete: false,
            },
        });
    },
    createSeatType: async (seatTypeData) => {
        return await seatTypeModel.create(seatTypeData);
    },
    getSeatNumberLimits: async (id) => {
        return await seatTypeModel.findByPk(id, {
            attributes: ["seatStartedAt", "seatEndingAt"],
        });
    },
    updateSeatType: async (id, seatTypeData) => {
        return await seatTypeModel.update(seatTypeData, {
            where: {
                id,
            },
        });
    },
    deleteSeatType: async (id) => {
        return await seatTypeModel.destroy({
            where: {
                id,
            },
        });
    },
};

module.exports = SeatTypeRepository;
