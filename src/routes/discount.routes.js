const router = require("express").Router();
const discountController = require("../controllers/discount.controller");
const { PERMISSIONS } = require("../helper/permissions");
const { verifyPermission } = require("../middleware/permissions.middleware");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

router.use(verifyToken);
router.use(verifyPermission(PERMISSIONS.DISCOUNT_MANAGE));

router.get("/", discountController.getAllDiscounts);
router.get("/:id", discountController.getDiscountById);
router.post("/", discountController.createDiscount);
router.put("/:id", discountController.updateDiscount);
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
