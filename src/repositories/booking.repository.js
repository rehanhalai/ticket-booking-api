const booking = require("../models/booking.model");
const { Op } = require("sequelize");
const user = require("../models/user.model");

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
    getAllBookingByUserId: async (userId) => {
        return await booking.findAll({
            where: {
                user: userId,
                softDelete: false,
            },
        });
    },
    getConflictingBookings: async (seatNumbers, seatType, excludeBookingId = null) => {
        const whereClause = {
            seatNo: {
                [Op.overlap]: seatNumbers,
            },
            softDelete: false,
            seatType,
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
    getAllBookingsFullData: async () => {
        return await booking.findAll({
            where: {
                softDelete: false,
            },
            include: {
                model: user,
                as: "userData",
                attributes: ["id", "name"],
                raw: true,
                nest: true,
            },
        });
    },
};

module.exports = UserBookingRepo;
