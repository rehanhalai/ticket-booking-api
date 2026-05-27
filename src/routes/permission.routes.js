const router = require("express").Router();
const permissionController = require("../controllers/permission.controller");
const { PERMISSIONS } = require("../helper/permissions");
const { verifyPermission } = require("../middleware/permissions.middleware");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

router.use(verifyToken);
// router.use(verifyPermission(PERMISSIONS.PERMISSION_MANAGE));

router.get("/", permissionController.getAllPermissions);
router.get("/one", permissionController.getOnePermission);
router.get("/:id", permissionController.getPermissionById);
router.post("/", permissionController.createPermission);
router.put("/:id", permissionController.updatePermission);
router.delete("/:id", permissionController.deletePermission);

module.exports = router;
