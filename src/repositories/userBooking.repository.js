const booking = require("../models/userBooking");
const { Op } = require("sequelize");

const UserBookingRepo = {

    getAllBookings : async () => {
        return await booking.findAll();
    },

    getBookingById : async (id) => {
        return await booking.findByPk(id);
    },
    getConflictingBookings: async (seatNumbers, excludeBookingId = null) => {
        const whereClause = {
            seatNo: {
                [Op.overlap]: seatNumbers
            }
        };
        if (excludeBookingId) {
            whereClause.id = {
                [Op.ne]: excludeBookingId
            };
        }

        return await booking.findAll({
            where: whereClause
        });
    }
    ,    
    createBooking : async (bookingData) => {
        return await booking.create(bookingData);
    },

    updateBooking : async (id, bookingData) => {
        return await booking.update(bookingData,{
            where:{
                id
            }
        })
    },
    deleteBooking : async (id) => {
        return await booking.destroy({
            where:{
                id
            }
        })
    }
}

module.exports = UserBookingRepo;