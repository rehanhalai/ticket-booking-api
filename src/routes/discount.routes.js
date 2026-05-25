const router = require("express").Router();
const discountController = require("../controllers/discount.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;
const verifyRole = require("../middleware/roles.middleware").verifyRole;
const ROLES = require("../helper/roles");

router.use(verifyToken);
router.use(verifyRole([ROLES.ADMIN]));

router.get("/", discountController.getAllDiscounts);
router.get("/:id", discountController.getDiscountById);
router.post("/", discountController.createDiscount);
router.put("/:id", discountController.updateDiscount);
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
