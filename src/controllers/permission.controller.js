const permissionService = require("../services/permission.service");
const asyncHandler = require("../helper/asyncHandler");
const ApiResponse = require("../helper/apiResponse");
const { messages } = require("../constants/messages");

const permissionController = {
    getAllPermissions: asyncHandler(async (req, res) => {
        const data = await permissionService.getAllPermissions();
        ApiResponse.success(res, messages.PERMISSION_FETCHED_SUCCESSFULLY, data);
    }),

    getOnePermission: asyncHandler(async (req, res) => {
        const { name } = req.query;
        const data = await permissionService.getPermissionByName(name);
        ApiResponse.success(res, messages.PERMISSION_FETCHED_SUCCESSFULLY, data);
    }),

    getPermissionById: asyncHandler(async (req, res) => {
        const data = await permissionService.getPermissionById(req.params.id);
        ApiResponse.success(res, messages.PERMISSION_FETCHED_SUCCESSFULLY, data);
    }),

    createPermission: asyncHandler(async (req, res) => {
        const data = await permissionService.createPermission(req.body);
        ApiResponse.success(res, messages.PERMISSION_CREATED_SUCCESSFULLY, data);
    }),

    updatePermission: asyncHandler(async (req, res) => {
        const data = await permissionService.updatePermission(req.params.id, req.body);
        ApiResponse.success(res, messages.PERMISSION_UPDATED_SUCCESSFULLY, data);
    }),

    deletePermission: asyncHandler(async (req, res) => {
        const data = await permissionService.deletePermission(req.params.id);
        ApiResponse.success(res, messages.PERMISSION_DELETED_SUCCESSFULLY, data);
    }),
};

module.exports = permissionController;
