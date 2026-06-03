const router = require("express").Router();
const bookingController = require("../controllers/userBooking.controller");
const { verifyPermission } = require("../middleware/permissions.middleware");
const { verifyToken } = require("../middleware/auth.middleware");
const { PERMISSIONS } = require("../helper/permissions");

router.use(verifyToken);

router.use(verifyPermission(PERMISSIONS.BOOKING_VIEW));
const manageOnly = verifyPermission(PERMISSIONS.BOOKING_MANAGE);

router.get("/", bookingController.getAllBookings);
router.get("/stream", bookingController.getBookingsByEmmiter);
router.get("/user/:id", bookingController.getAllBookingByUserId);

router.get("/all-reports", manageOnly, bookingController.createAllBookingsReport);
router.get("/:id", bookingController.getBookingById);

router.post("/", manageOnly, bookingController.createBooking);
router.put("/:id", manageOnly, bookingController.updateBooking);
router.delete("/:id", manageOnly, bookingController.deleteBooking);
router.get("/report/:id", manageOnly, bookingController.createUserBookingReport);

module.exports = router;
