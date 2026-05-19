const booking = require("../models/booking.model");
const { Op } = require("sequelize");

const UserBookingRepo = {
    getAllBookings: async () => {
        return await booking.findAll({
            where: {
                softDelete: false,
            },
        });
    },

    getBookingById: async (id) => {
        return await booking.findOne({
            where: {
                id,
                softDelete: false,
            },
        });
    },

    getConflictingBookings: async (seatNumbers, excludeBookingId = null) => {
        const whereClause = {
            seatNo: {
                [Op.overlap]: seatNumbers,
            },
            softDelete: false,
        };
        if (excludeBookingId) {
            whereClause.id = {
                [Op.ne]: excludeBookingId,
            };
        }

        return await booking.findAll({
            where: whereClause,
        });
    },
    createBooking: async (bookingData) => {
        return await booking.create(bookingData);
    },

    updateBooking: async (id, bookingData) => {
        return await booking.update(bookingData, {
            where: {
                id,
            },
        });
    },
    deleteBooking: async (id) => {
        return await booking.destroy({
            where: {
                id,
            },
        });
    },
};

module.exports = UserBookingRepo;
