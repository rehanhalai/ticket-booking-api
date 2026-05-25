const roleModel = require("../models/role.model");

const RoleRepository = {
    async fetchAllRoles(){
        return await roleModel.findAll()
    },
    async createRole(roleData){
        return await roleModel.create(roleData)
    },
    async fetchById(roleId){
        return await roleModel.findByPk(roleId);
    } 
}

module.exports = RoleRepository;