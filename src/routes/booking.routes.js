const router = require("express").Router();
const bookingController = require("../controllers/userBooking.controller");
const { verifyPermission } = require("../middleware/permissions.middleware");
const {verifyToken} = require("../middleware/auth.middleware");
const { PERMISSIONS } = require("../helper/permissions");

router.use(verifyToken);

router.use(verifyPermission("booking:view"));

router.use(verifyPermission(PERMISSIONS.BOOKING_VIEW));

router.get("/",bookingController.getAllBookings);
router.get("/stream",bookingController.getBookingsByEmmiter);
router.get("/:id",bookingController.getBookingById);


router.use(verifyPermission(PERMISSIONS.BOOKING_MANAGE));

router.post("/",bookingController.createBooking);
router.put("/:id",bookingController.updateBooking);
router.delete("/:id",bookingController.deleteBooking);

module.exports = router;
