const userBookingRepo = require("../repositories/booking.repository");
const seatTypeRepo = require("../repositories/seatType.repository");
const ApiError = require("../helper/apiError");
const DiscountRepository = require("../repositories/discount.repository");
const bookingEmitter = require("../emitter/booking.emitter");
const messages = require("../constants/messages").messages;
const StatusCodes = require("http-status-codes").StatusCodes;
const workBook = require("exceljs");
const bookingService = {
    async getAllBookings() {
        return await userBookingRepo.getAllBookings();
    },

    async getBookingById(id) {
        const data = await userBookingRepo.getBookingById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.BOOKING_NOT_FOUND);
        }
        return data;
    },

    async getAllBookingByUserId(userId) {
        const data = await userBookingRepo.getAllBookingByUserId(userId);
        if (!data || data.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.BOOKING_NOT_FOUND);
        }
        return data;
    },

    async createBooking(bookingData) {
        if (!bookingData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.BOOKING_FIELDS_REQUIRED);
        }
        if (!bookingData.user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.USER_NOT_FOUND);
        }
        const { seatNumbers, seatTypeId } = bookingData;
        if (!seatNumbers || !seatTypeId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.BOOKING_FIELDS_REQUIRED);
        }
        if (
            Array.isArray(seatNumbers) === false ||
            seatNumbers.length === 0 ||
            seatNumbers.some((seat) => typeof seat !== "number")
        ) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.INVALID_SEAT_NUMBERS);
        }

        // seat type verification
        const seatTypeVerification = await seatTypeRepo.getSeatTypeById(seatTypeId);
        if (!seatTypeVerification) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.SEAT_TYPE_NOT_FOUND);
        }

        // set number check
        const seatLimits = await seatTypeRepo.getSeatNumberLimits(seatTypeId);
        const { seatStartedAt, seatEndingAt } = seatLimits;
        const invalidSeatNumbers = seatNumbers.filter((seatNo) => seatNo < seatStartedAt || seatNo > seatEndingAt);
        if (invalidSeatNumbers.length > 0) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                `Invalid seat numbers: ${invalidSeatNumbers.join(", ")}. Valid range is ${seatStartedAt} to ${seatEndingAt}`,
            );
        }

        // seat availability verification
        const conflictBookings = await userBookingRepo.getConflictingBookings(seatNumbers, seatTypeId);
        if (conflictBookings && conflictBookings.length > 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.SEAT_ALREADY_BOOKED);
        }

        // total ticket price
        const totalTicketPrice = seatNumbers.length * seatTypeVerification.ticketPrice;

        let discountRecord = await DiscountRepository.getDiscountsByTicketCount(seatNumbers.length);

        const activeDiscount = discountRecord && discountRecord[0];
        const discountValue = activeDiscount ? JSON.parse(activeDiscount.metadata).value : 0;

        const FinalTotalTicketPrice = discountValue
            ? totalTicketPrice - (totalTicketPrice * discountValue) / 100
            : totalTicketPrice;

        const record = await userBookingRepo.createBooking({
            user: bookingData.user.id,
            seatNo: seatNumbers,
            seatType: seatTypeId,
            ticketPrice: FinalTotalTicketPrice,
        });

        bookingEmitter.emit("booking:created", {
            userId: bookingData.user.id,
        });
        return {
            record,
            oldPrice: totalTicketPrice,
        };
    },

    async updateBooking(id, bookingData) {
        if (!bookingData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.BOOKING_FIELDS_REQUIRED);
        }
        const oldBooking = await userBookingRepo.getBookingById(id);

        if (!oldBooking) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.BOOKING_NOT_FOUND);
        }

        const { seatNumbers, seatTypeId } = bookingData;

        const finalSeatTypeId = seatTypeId || oldBooking.seatType;
        const finalSeatNumbers = seatNumbers || oldBooking.seatNo;

        let totalTicketPrice = oldBooking.ticketPrice;

        if (bookingData.user.id !== oldBooking.user) {
            throw new ApiError(StatusCodes.FORBIDDEN, messages.INSUFFICIENT_PERMISSIONS);
        }

        if (seatNumbers || seatTypeId) {
            const seatTypeVerification = await seatTypeRepo.getSeatTypeById(finalSeatTypeId);
            if (!seatTypeVerification) {
                throw new ApiError(StatusCodes.NOT_FOUND, messages.SEAT_TYPE_NOT_FOUND);
            }

            const seatLimits = await seatTypeRepo.getSeatNumberLimits(finalSeatTypeId);
            const { seatStartedAt, seatEndingAt } = seatLimits;

            const invalidSeatNumbers = finalSeatNumbers.filter(
                (seatNo) => seatNo < seatStartedAt || seatNo > seatEndingAt,
            );
            if (invalidSeatNumbers.length > 0) {
                throw new ApiError(
                    StatusCodes.BAD_REQUEST,
                    `Invalid seat numbers: ${invalidSeatNumbers.join(", ")}. Valid range is ${seatStartedAt} to ${seatEndingAt}`,
                );
            }

            const conflictBookings = await userBookingRepo.getConflictingBookings(finalSeatNumbers, id);

            if (conflictBookings && conflictBookings.length > 0) {
                throw new ApiError(StatusCodes.BAD_REQUEST, messages.SEAT_ALREADY_BOOKED);
            }

            totalTicketPrice = finalSeatNumbers.length * seatTypeVerification.ticketPrice;

            let discountRecord = await DiscountRepository.getDiscountsByTicketCount(finalSeatNumbers.length);

            const activeDiscount = discountRecord && discountRecord[0];
            const discountValue = activeDiscount ? JSON.parse(activeDiscount.metadata).value : 0;

            totalTicketPrice = discountValue
                ? totalTicketPrice - (totalTicketPrice * discountValue) / 100
                : totalTicketPrice;
        }

        const updatedUserBooking = await userBookingRepo.updateBooking(id, {
            seatNo: finalSeatNumbers,
            seatType: finalSeatTypeId,
            ticketPrice: totalTicketPrice,
        });
        return updatedUserBooking;
    },

    async deleteBooking(payload) {
        const { id, user } = payload;
        const booking = await userBookingRepo.getBookingById(id);

        if (!booking) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.BOOKING_NOT_FOUND);
        }

        const isOwner = booking.user.toString() === user.id.toString();

        if (!isOwner) {
            throw new ApiError(StatusCodes.FORBIDDEN, messages.INSUFFICIENT_PERMISSIONS);
        }

        return await userBookingRepo.updateBooking(id, {
            softDelete: true,
        });
    },

    async createBookingReport(userId) {
        if (!userId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.USER_NOT_FOUND);
        }
        const bookings = await userBookingRepo.getAllBookingByUserId(userId);
        if (!bookings || bookings.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.BOOKING_NOT_FOUND);
        }

        const workbook = new workBook.Workbook();
        const worksheet = workbook.addWorksheet("Bookings Report");

        worksheet.addRow(["id", "UserId", "SeatNo", "SeatType", "Total"]);

        for (const booking of bookings) {
            worksheet.addRow([
                booking.id,
                booking.user,
                booking.seatNo.join(", "),
                booking.seatType,
                booking.ticketPrice,
            ]);
        }

        worksheet.getRow(1).font = { bold: true };

        const buffer = await workbook.xlsx.writeBuffer();
        return {
            buffer,
            fileName: `booking-report-${userId}.xlsx`,
        };
    },
    async getAllBookingsReport() {
        const bookings = await userBookingRepo.getAllBookingsFullData();
        if (!bookings || bookings.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.BOOKING_NOT_FOUND);
        }

        const workbook = new workBook.Workbook();
        const worksheet = workbook.addWorksheet("Bookings Report");

        worksheet.addRow(["serial no", "user's name", "SeatNo", "SeatType", "Total"]);

        for (const booking of bookings) {
            worksheet.addRow([
                booking.id,
                booking.userData.name,
                booking.seatNo.join(", "),
                booking.seatType,
                booking.ticketPrice,
            ]);
        }

        worksheet.getRow(1).font = { bold: true };

        worksheet.columns.forEach((column) => {
            let maxColumnLength = 0;

            column.eachCell({ includeEmpty: true }, (cell) => {
                const cellLength = cell.value ? cell.value.toString().length : 0;
                if (cellLength > maxColumnLength) {
                    maxColumnLength = cellLength;
                }
            });

            column.width = Math.max(maxColumnLength + 4, 10);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return {
            buffer,
            fileName: `booking-report-${Date.now()}.xlsx`,
        };
    },
};

module.exports = bookingService;
