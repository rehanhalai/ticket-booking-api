const router = require("express").Router();
const bookingController = require("../controllers/userBooking.controller");
const verifyToken = require("../middleware/auth.middleware").verifyToken;

router.use(verifyToken);

router.get("/", bookingController.getAllBookings);
router.get("/stream", bookingController.getBookingsByEmmiter);
router.get("/:id", bookingController.getBookingById);

router.post("/", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
