const discountRepo = require("../repositories/discount.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const StatusCodes = require("http-status-codes").StatusCodes;

const discountService = {
    getAllDiscounts: async () => {
        return await discountRepo.getAllDiscounts();
    },

    getDiscountById: async (id) => {
        const data = await discountRepo.getDiscountById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.DISCOUNT_NOT_FOUND);
        }
        return data;
    },

    createDiscount: async (discountData) => {
        const { minimumTicketCount, percentage } = discountData;
        if (!minimumTicketCount || !percentage) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.DISCOUNT_FIELDS_REQUIRED);
        }
        const toSave = { key: minimumTicketCount, value: percentage };

        return await discountRepo.createDiscount(toSave);
    },
    updateDiscount: async (id, discountData) => {
        const existingDiscount = await discountRepo.getDiscountById(id);
        if (!existingDiscount) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.DISCOUNT_NOT_FOUND);
        }

        // Map incoming fields to model fields when updating
        const { minimumTicketCount, percentage } = discountData;
        const updateData = {};
        if (minimumTicketCount !== undefined) updateData.key = minimumTicketCount;
        if (percentage !== undefined) updateData.value = percentage;

        return await discountRepo.updateDiscount(id, updateData);
    },
    deleteDiscount: async (id) => {
        const existingDiscount = await discountRepo.getDiscountById(id);
        if (!existingDiscount) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.DISCOUNT_NOT_FOUND);
        }

        return await discountRepo.deleteDiscount(id);
    },
};

module.exports = discountService;
