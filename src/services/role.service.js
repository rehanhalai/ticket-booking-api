const { StatusCodes } = require("http-status-codes")
const ApiError = require("../helper/apiError")
const roleRepo = require("../repositories/role.repository")

const RoleService = {
    async getAllRoles(){
        return await roleRepo.fetchAllRoles()
    },
    async createRole(roleData){
        const { name, permissions } = roleData
        if (!name || permissions === undefined || !Array.isArray(permissions) || permissions.length === 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Role name and permissions are required")
        }
        if(typeof name !== "string" || name.trim() === ""){
            throw new ApiError(StatusCodes.BAD_REQUEST, "Role name must be a string")
        }

        const role = await roleRepo.createRole(name)
        for (const permissionId of permissions) {
            await role.addPermission(permissionId)
        }
        return role;
    }
}

module.exports = RoleService