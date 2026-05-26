const permissionModel = require("../models/permission.model");

const PermissionRepository = {
    getAllPermissions: async () => {
        return await permissionModel.findAll({
            where: {
                softDelete: false,
            },
        });
    },

    getPermissionById: async (id) => {
        return await permissionModel.findOne({
            where: {
                id,
                softDelete: false,
            },
        });
    },

    getPermissionByName: async (name) => {
        return await permissionModel.findOne({
            where: {
                name,
                softDelete: false,
            },
        });
    },

    createPermission: async (permissionData) => {
        return await permissionModel.create(permissionData);
    },

    updatePermission: async (id, permissionData) => {
        return await permissionModel.update(permissionData, {
            where: {
                id,
            },
        });
    },

    deletePermission: async (id) => {
        return await permissionModel.destroy({
            where: {
                id,
            },
        });
    },
};

module.exports = PermissionRepository;
