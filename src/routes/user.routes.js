const router = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;
const { PERMISSIONS } = require("../helper/permissions");
const { verifyPermission } = require("../middleware/permissions.middleware");

router.use(verifyToken);
router.use(verifyPermission(PERMISSIONS.USER_VIEW));

router.get("/", userController.getAllUsers);
router.get("/profile", verifyToken, userController.getProfile);
router.get("/:id", userController.getUserById);

module.exports = router;
