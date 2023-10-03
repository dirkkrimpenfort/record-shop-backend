//Aufgabe 01
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const PORT = process.env.PORT;

const { connect, closeConnection } = require("./configs/db.js");
connect();

//Aufgabe 02-Middleware
app.use(cors());
const meineMiddleware = require("./middleware/corsMiddleware");
app.use(meineMiddleware);

//Aufgabe 01(Get und Post) und 03 -Routing
const recordsRouter = require("./routes/recordsRouter");
app.use("/api/records", recordsRouter);

const usersRouter = require("./routes/usersRouter");
app.use("/api/users", usersRouter);

const ordersRouter = require("./routes/ordersRouter");
app.use("/api/orders", ordersRouter);

const addressesRouter = require("./routes/addressesRouter");
app.use("/api/addresses", addressesRouter);

const loginRouter = require("./routes/loginRouter");
app.use("/api/login", loginRouter);

const mailRouter = require("./routes/mailRouter");
app.use("/api/mail", mailRouter);

const emailVerificationRouter = require("./routes/emailVerificationRouter");
app.use("/api/emailVerification", emailVerificationRouter);

//Ende Routing

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
