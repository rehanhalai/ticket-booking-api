const route = require("express").Router();
const roleController = require("../controllers/role.controller");

route.get("/", roleController.getAllRoles);
route.post("/", roleController.createRole);

module.exports = route;