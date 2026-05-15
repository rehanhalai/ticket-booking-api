const userModel = require("../models/user.model");

const UserRepository = {
    getAllUsers : async () => {
        return await userModel.findAll();
    },
    getUserById : async (id) => {
        return await userModel.findByPk(id);
    },
    getUserByEmail: async (email) => {
        return await userModel.findOne({ where: { email } });
    },
    createUser : async (userData) => {
        return await userModel.create(userData);
    },
    updateUser : async (id, userData) => {
        return await userModel.update(userData,{
            where:{
                id
            }
        })
    },
    deleteUser : async (id) => {
        return await userModel.destroy({
            where:{
                id
            }
        })
    }
}