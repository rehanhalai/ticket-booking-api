const roleModel = require("../models/role.model");

const RoleRepository = {
    async fetchAllRoles(){
        return await roleModel.findAll()
    },
    async createRole(name){
        return await roleModel.create({ name })
    },
    async fetchById(id){
        return await roleModel.findByPk(id);
    } 
}

module.exports = RoleRepository;