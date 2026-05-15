const seatTypeService = require("../services/seatType.services");
const asyncHandler = require("../helper/asyncHandler");
const ApiResponse = require("../helper/apiResponse");

const seatTypeController = {
   getAllSeatTypes: asyncHandler(async (req, res) => {
      const data = await seatTypeService.getAllSeatTypes();
      ApiResponse.success(res, "Seat types retrieved successfully", data);
   }),

   getSeatTypeById: asyncHandler(async (req, res) => {
      const data = await seatTypeService.getSeatTypeById(req.params.id);
      ApiResponse.success(res, "Seat type retrieved successfully", data);
   }),

   createSeatType: asyncHandler(async (req, res) => {
      const data = await seatTypeService.createSeatType(req.body);
      ApiResponse.success(res, "Seat type created successfully", data);
   }),

   updateSeatType: asyncHandler(async (req, res) => {
      const data = await seatTypeService.updateSeatType(req.params.id, req.body);
      ApiResponse.success(res, "Seat type updated successfully", data);
   }),

   deleteSeatType: asyncHandler(async (req, res) => {
      const data = await seatTypeService.deleteSeatType(req.params.id);
      ApiResponse.success(res, "Seat type deleted successfully", data);
   }),
};

module.exports = seatTypeController;
