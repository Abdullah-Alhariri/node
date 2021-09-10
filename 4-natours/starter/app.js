const express = require("express");
const AppError = require("./utils/appError");
const app = express();
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
console.log(process.env.NODE_ENV);

app.use(express.static(`${__dirname}/public`)); // normaly you cant acces files from browsers. this let files/people get acces to files from the URL
app.use(express.json()); // To get the body-data from the use in post request (middleware). if you don't add this you will get undefined if you want to acces the req.body
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find f${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
