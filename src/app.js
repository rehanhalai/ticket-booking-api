const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./config/db");
const bookingRoutes = require("./routes/booking.routes");
const seatTypeRoutes = require("./routes/seatType.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const discountRoutes = require("./routes/discount.routes");
const { runasync } = require("./models/index");
const { errorHandler } = require("./middleware/error.middleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

connectToDatabase();

app.use("/booking", bookingRoutes);
app.use("/seat-type", seatTypeRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/discounts", discountRoutes);

// global error handler
app.use(errorHandler);

app.listen(port, async () => {
    await runasync();
    console.log(`server running on port ${port}`);
});