const router = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;
const { PERMISSIONS } = require("../helper/permissions");
const { verifyPermission } = require("../middleware/permissions.middleware");

router.use(verifyToken);
router.use();

router.get("/", userController.getAllUsers);

router.get("/profile", verifyToken, verifyPermission(PERMISSIONS.USER_VIEW), userController.getProfile);

router.get("/:id", userController.getUserById);

router.put("/block/:id", verifyToken, verifyPermission(PERMISSIONS.USER_MANAGE), userController.blockUserById);
router.put("/unblock/:id", verifyToken, verifyPermission(PERMISSIONS.USER_MANAGE), userController.unblockUserById);

module.exports = router;
