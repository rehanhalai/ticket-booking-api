const discountService = require("../services/discount.service");
const ApiResponse = require("../helper/apiResponse");
const asyncHandler = require("../helper/asyncHandler");
const messages = require("../constants/messages").messages;

const discountController = {
    getAllDiscounts: asyncHandler(async (req, res) => {
        const data = await discountService.getAllDiscounts();
        ApiResponse.success(res, messages.DISCOUNTS_FETCHED_SUCCESSFULLY, data);
    }),
    getDiscountById: asyncHandler(async (req, res) => {
        const data = await discountService.getDiscountById(req.params.id);
        ApiResponse.success(res, messages.DISCOUNT_FETCHED_SUCCESSFULLY, data);
    }),
    createDiscount: asyncHandler(async (req, res) => {
        const data = await discountService.createDiscount(req.body);
        ApiResponse.success(res, messages.DISCOUNT_CREATED_SUCCESSFULLY, data);
    }),
    updateDiscount: asyncHandler(async (req, res) => {
        const data = await discountService.updateDiscount(req.params.id, req.body);
        ApiResponse.success(res, messages.DISCOUNT_UPDATED_SUCCESSFULLY, data);
    }),
    deleteDiscount: asyncHandler(async (req, res) => {
        const data = await discountService.deleteDiscount(req.params.id);
        ApiResponse.success(res, messages.DISCOUNT_DELETED_SUCCESSFULLY, data);
    }),
};

module.exports = discountController;
