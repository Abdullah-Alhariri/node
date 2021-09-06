const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use(morgan("dev"));
app.use(express.json()); // To get the body-data from the use in post request (middleware). if you don't add this you will get undefined if you want to acces the req.body
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
