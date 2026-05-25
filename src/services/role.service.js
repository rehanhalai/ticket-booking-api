const { StatusCodes } = require("http-status-codes")
const ApiError = require("../helper/apiError")
const roleRepo = require("../repositories/role.repository")

const RoleService = {
    async getAllRoles(){
        return await roleRepo.fetchAllRoles()
    },
    async createRole(roleData){
        const { name } = roleData
        if (!name) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Role name is required")
        }

        return await roleRepo.createRole(roleData)
    }
}

module.exports = RoleService