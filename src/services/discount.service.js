const discountRepo = require("../repositories/discount.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const StatusCodes = require("http-status-codes").StatusCodes;

const discountService = {
    getAllDiscounts: async () => {
        const records = await discountRepo.getAllDiscounts();
        const data = records.map((record) => ({
            id: record.id,
            name: record.name,
            metadata: record.metadata ? JSON.parse(record.metadata) : null,
        }));
        return data;
    },

    getDiscountById: async (id) => {
        let data = await discountRepo.getDiscountById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.DISCOUNT_NOT_FOUND);
        }
        data = {
            id: data.id,
            name: data.name,
            metadata: data.metadata ? JSON.parse(data.metadata) : null,
        };
        return data;
    },

    createDiscount: async (discountData) => {
        const { name, minimumTicketCount, percentage } = discountData;
        if (!name || !minimumTicketCount || !percentage) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.DISCOUNT_FIELDS_REQUIRED);
        }
        const toSave = {
            name,
            metadata: JSON.stringify({ count: minimumTicketCount, value: percentage }),
        };

        return await discountRepo.createDiscount(toSave);
    },
    updateDiscount: async (id, discountData) => {
        const existingDiscount = await discountRepo.getDiscountById(id);
        if (!existingDiscount) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.DISCOUNT_NOT_FOUND);
        }

        // Map incoming fields to model fields when updating
        const { name, minimumTicketCount, percentage } = discountData;
        const updateData = {};
        if (minimumTicketCount !== undefined || percentage !== undefined) {
            const parsed = JSON.parse(existingDiscount.metadata);
            updateData.metadata = JSON.stringify({
                count: minimumTicketCount !== undefined ? minimumTicketCount : parsed.count,
                value: percentage !== undefined ? percentage : parsed.value,
            });
        }
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
