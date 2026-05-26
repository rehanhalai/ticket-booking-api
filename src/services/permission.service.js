const permissionRepo = require("../repositories/permission.repository");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;
const StatusCodes = require("http-status-codes").StatusCodes;

const permissionService = {
    getAllPermissions: async () => {
        return await permissionRepo.getAllPermissions();
    },

    getPermissionById: async (id) => {
        const data = await permissionRepo.getPermissionById(id);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.PERMISSION_NOT_FOUND);
        }
        return data;
    },

    getPermissionByName: async (name) => {
        if (!name) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.PERMISSION_FIELDS_REQUIRED);
        }
        const data = await permissionRepo.getPermissionByName(name);
        if (!data) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.PERMISSION_NOT_FOUND);
        }
        return data;
    },

    createPermission: async (permissionData) => {
        if (!permissionData || !permissionData.name) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.PERMISSION_FIELDS_REQUIRED);
        }
        return await permissionRepo.createPermission({
            name: permissionData.name,
        });
    },

    updatePermission: async (id, permissionData) => {
        if (!permissionData || !permissionData.name) {
            throw new ApiError(StatusCodes.BAD_REQUEST, messages.PERMISSION_FIELDS_REQUIRED);
        }
        const existing = await permissionRepo.getPermissionById(id);
        if (!existing) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.PERMISSION_NOT_FOUND);
        }
        return await permissionRepo.updatePermission(id, {
            name: permissionData.name,
        });
    },

    deletePermission: async (id) => {
        const existing = await permissionRepo.getPermissionById(id);
        if (!existing) {
            throw new ApiError(StatusCodes.NOT_FOUND, messages.PERMISSION_NOT_FOUND);
        }
        return await permissionRepo.updatePermission(id, {
            softDelete: true,
        });
    },
};

module.exports = permissionService;
