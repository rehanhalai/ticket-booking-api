const route = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

route.get("/", userController.getAllUsers);
route.get("/profile", verifyToken, userController.getProfile);
route.get("/:id", userController.getUserById);

module.exports = route;
