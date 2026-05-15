const userBookingRepo = require("../repositories/booking.repository");
const seatTypeRepo = require("../repositories/seatType.repository");
const { regexEmail, regexFirstUpperCase } = require("../helper/regex");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;


const bookingService = {
   async getAllBookings() {
      return await userBookingRepo.getAllBookings();
   },

   async getBookingById(id) {
      const data = await userBookingRepo.getBookingById(id);
      if (!data) {
         throw new ApiError(404, messages.BOOKING_NOT_FOUND);
      }
      return data;
   },

   async createBooking(bookingData) {
      if (!bookingData) {
         throw new ApiError(400, messages.BOOKING_FIELDS_REQUIRED);
      }
      const { name, email, seatNumbers, seatTypeId } = bookingData;
      if (!name || !email || !seatNumbers || !seatTypeId) {
         throw new ApiError(400, messages.BOOKING_FIELDS_REQUIRED);
      }
      if(Array.isArray(seatNumbers) === false || seatNumbers.length === 0 || seatNumbers.some(seat => typeof seat !== 'number')) {
         throw new ApiError(400, messages.INVALID_SEAT_NUMBERS);
      }

      if (!regexEmail(email)) {
         throw new ApiError(400, messages.INVALID_EMAIL);
      }
      if (!regexFirstUpperCase(name)) {
         throw new ApiError(400, messages.INVALID_NAME_FORMAT);
      }

      // seat type verification
      const seatTypeVerification = await seatTypeRepo.getSeatTypeById(seatTypeId);
      if (!seatTypeVerification) {
         throw new ApiError(404, messages.SEAT_TYPE_NOT_FOUND);
      }

      // set number check
      const seatLimits = await seatTypeRepo.getSeatNumberLimits(seatTypeId);
      const { seatStartedAt, seatEndingAt } = seatLimits;
      const invalidSeatNumbers = seatNumbers.filter(
         (seatNo) => seatNo < seatStartedAt || seatNo > seatEndingAt,
      );
      if (invalidSeatNumbers.length > 0) {
         throw new ApiError(
            400,
            `Invalid seat numbers: ${invalidSeatNumbers.join(", ")}. Valid range is ${seatStartedAt} to ${seatEndingAt}`,
         );
      }

      // seat availability verification
      const conflictBookings = await userBookingRepo.getConflictingBookings(seatNumbers);
      if (conflictBookings && conflictBookings.length > 0) {
         throw new ApiError(400, messages.SEAT_ALREADY_BOOKED);
      }

      // total ticket price
      const totalTicketPrice = seatNumbers.length * seatTypeVerification.ticketPrice;
      console.log("seatNumbers", seatNumbers);
      console.log("seatTypeVerification.ticketPrice", seatTypeVerification.ticketPrice);
      console.log("totalTicketPrice", totalTicketPrice);

      return await userBookingRepo.createBooking({
         email,
         name,
         seatNo: seatNumbers,
         seatType: seatTypeId,
         ticketPrice: totalTicketPrice,
      });
   },

   async updateBooking(id, bookingData) {
      if (!bookingData) {
         throw new ApiError(400, messages.BOOKING_FIELDS_REQUIRED);
      }
      const oldBooking = await userBookingRepo.getBookingById(id);

      if (!oldBooking) {
         throw new ApiError(404, messages.BOOKING_NOT_FOUND);
      }

      const { name, email, seatNumbers, seatTypeId } = bookingData;

      if (email ? !regexEmail(email) : false) {
         throw new ApiError(400, messages.INVALID_EMAIL);
      }
      if (name ? !regexFirstUpperCase(name) : false) {
         throw new ApiError(400, messages.INVALID_NAME_FORMAT);
      }

      const finalSeatTypeId = seatTypeId || oldBooking.seatType;
      const finalSeatNumbers = seatNumbers || oldBooking.seatNo;

      let totalTicketPrice = oldBooking.ticketPrice;

      if (seatNumbers || seatTypeId) {
         const seatTypeVerification = await seatTypeRepo.getSeatTypeById(finalSeatTypeId);
         if (!seatTypeVerification) {
            throw new ApiError(404, messages.SEAT_TYPE_NOT_FOUND);
         }

         const seatLimits = await seatTypeRepo.getSeatNumberLimits(finalSeatTypeId);
         const { seatStartedAt, seatEndingAt } = seatLimits;

         const invalidSeatNumbers = finalSeatNumbers.filter(
            (seatNo) => seatNo < seatStartedAt || seatNo > seatEndingAt,
         );
         if (invalidSeatNumbers.length > 0) {
            throw new ApiError(
               400,
               `Invalid seat numbers: ${invalidSeatNumbers.join(", ")}. Valid range is ${seatStartedAt} to ${seatEndingAt}`,
            );
         }

         const conflictBookings = await userBookingRepo.getConflictingBookings(
            finalSeatNumbers,
            id,
         );

         if (conflictBookings && conflictBookings.length > 0) {
            throw new ApiError(400, messages.SEAT_ALREADY_BOOKED);
         }

         totalTicketPrice = finalSeatNumbers.length * seatTypeVerification.price;
      }

      const updatedUserBooking = await userBookingRepo.updateBooking(id, {
         email: email || oldBooking.email,
         name: name || oldBooking.name,
         seatNo: finalSeatNumbers,
         seatType: finalSeatTypeId,
         ticketPrice: totalTicketPrice,
      });
      return updatedUserBooking;
   },

   async deleteBooking(id) {
      const booking = await userBookingRepo.getBookingById(id);
      if (!booking) {
         throw new ApiError(404, messages.BOOKING_NOT_FOUND);
      }
      return await userBookingRepo.deleteBooking(id);
   },
};

module.exports = bookingService;
