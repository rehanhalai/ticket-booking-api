const router = require("express").Router();
const seatTypeController = require("../controllers/seatType.controller");

router.get("/", seatTypeController.getAllSeatTypes);
router.get("/:id", seatTypeController.getSeatTypeById);
router.post("/", seatTypeController.createSeatType);
router.put("/:id", seatTypeController.updateSeatType);
router.delete("/:id", seatTypeController.deleteSeatType);

module.exports = router;