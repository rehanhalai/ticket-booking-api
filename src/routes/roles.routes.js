const route = require("express").Router();
const roleController = require("../controllers/role.controller");
const { PERMISSIONS } = require("../helper/permissions");
const { verifyPermission } = require("../middleware/permissions.middleware");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

route.use(verifyToken);
route.use(verifyPermission(PERMISSIONS.ROLE_MANAGE));

route.get("/", roleController.getAllRoles);
route.post("/", roleController.createRole);

module.exports = route;