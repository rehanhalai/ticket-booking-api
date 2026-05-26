const router = require("express").Router();
const seatTypeController = require("../controllers/seatType.controller");
const { PERMISSIONS } = require("../helper/permissions");
const { verifyPermission } = require("../middleware/permissions.middleware");
const verifyToken = require("../middleware/auth.middleware").verifyToken;


router.use(verifyToken);
router.use(verifyPermission(PERMISSIONS.SEAT_TYPE_MANAGE));

router.get("/", seatTypeController.getAllSeatTypes);
router.post("/", seatTypeController.createSeatType);
router.get("/:id", seatTypeController.getSeatTypeById);
router.put("/:id", seatTypeController.updateSeatType);
router.delete("/:id", seatTypeController.deleteSeatType);

module.exports = router;
