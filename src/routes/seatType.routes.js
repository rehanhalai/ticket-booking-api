const router = require("express").Router();
const seatTypeController = require("../controllers/seatType.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;
const verifyRole = require("../middleware/roles.middleware").verifyRole;
const ROLES = require("../helper/roles")

router.use(verifyToken);
router.use(verifyRole([ROLES.ADMIN]));

router.get("/", seatTypeController.getAllSeatTypes);
router.post("/", seatTypeController.createSeatType);
router.get("/:id", seatTypeController.getSeatTypeById);
router.put("/:id", seatTypeController.updateSeatType);
router.delete("/:id", seatTypeController.deleteSeatType);

module.exports = router;
