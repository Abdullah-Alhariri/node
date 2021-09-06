const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = express.Router();
const userRouter = express.Router();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use(morgan("dev"));
app.use(express.json()); // To get the body-data from the use in post request (middleware). if you don't add this you will get undefined if you want to acces the req.body
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // don't foget this
});

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "Success",
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  // After th ":" comes the variable, the value is stored in req.params. For optional variables type ? after them
  const id = +req.params.id;
  const tour = tours.find((el) => +el.id === id);

  res.status(!tour ? 404 : 200).json({
    status: !tour ? "Not Found" : "Success",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // This overwrites original variable
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    // Stringify : JS => JSON,
    res.status(201).json({
      // 201 = created
      status: "Success",
      results: tours.length,
      data: { tour: newTour },
    });
  });
};
const deleteTour = (req, res) => {
  const id = +req.params.id;

  res.status(tours.length < id || id < 0 ? 404 : 204).json({
    status: tours.length < id || id < 0 ? "Not Found" : "Success",
    data: null,
  });
};
const updateTour = (req, res) => {
  const id = +req.params.id;

  res.status(tours.length < id || id < 0 ? 404 : 200).json({
    status: tours.length < id || id < 0 ? "Not Found" : "Success",
    data: {
      tours: "Updated tour here...",
    },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
const createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
const updateUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
userRouter.route("/").get(getAllUsers).post(createUsers);
userRouter.route("/:id").get(getUser).patch(updateUsers).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
