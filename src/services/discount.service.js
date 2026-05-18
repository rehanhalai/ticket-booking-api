const discountRepo = require("../repositories/discount.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;

const discountService = {
  getAllDiscounts: async () => {
    return await discountRepo.getAllDiscounts();
  },

  getDiscountById: async (id) => {
    const data = await discountRepo.getDiscountById(id);
    if (!data) {
      throw new ApiError(404, messages.DISCOUNT_NOT_FOUND);
    }
    return data;
  },

  createDiscount: async (discountData) => {
    const { minimumTicketCount, percentage } = discountData;
    if (!minimumTicketCount || !percentage) {
      throw new ApiError(400, messages.DISCOUNT_FIELDS_REQUIRED);
    }

    return await discountRepo.createDiscount(discountData);
  },
  updateDiscount: async (id, discountData) => {
    const existingDiscount = await discountRepo.getDiscountById(id);
    if (!existingDiscount) {
      throw new ApiError(404, messages.DISCOUNT_NOT_FOUND);
    }

    return await discountRepo.updateDiscount(id, discountData);
  },
  deleteDiscount: async (id) => {
    const existingDiscount = await discountRepo.getDiscountById(id);
    if (!existingDiscount) {
      throw new ApiError(404, messages.DISCOUNT_NOT_FOUND);
    }

    return await discountRepo.deleteDiscount(id);
  },
};
