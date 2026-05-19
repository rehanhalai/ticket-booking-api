const router = require("express").Router();
const seatTypeController = require("../controllers/seatType.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;
const verifyRole = require("../middleware/roles.middleware").verifyRole;

router.use(verifyToken);
router.use(verifyRole(["2"]));

router.get("/", seatTypeController.getAllSeatTypes);
router.get("/:id", seatTypeController.getSeatTypeById);
router.post("/", seatTypeController.createSeatType);
router.put("/:id", seatTypeController.updateSeatType);
router.delete("/:id", seatTypeController.deleteSeatType);

module.exports = router;