const roleService = require("../services/role.service")
const ApiResponse = require("../helper/apiResponse")
const { messages } = require("../constants/messages")
const { StatusCodes } = require("http-status-codes")

const RoleController = {
    async getAllRoles(req, res){
        const data = await roleService.getAllRoles()
        ApiResponse.success(res,messages.ROLES_FETCHED_SUCCESSFULLY, data)
    },
    async createRole(req, res){
        const data = await roleService.createRole(req.body)
        ApiResponse.success(res,messages.ROLE_CREATED_SUCCESSFULLY, data)
    }
}

module.exports = RoleController