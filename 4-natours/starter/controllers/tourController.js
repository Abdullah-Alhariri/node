// const fs = require("fs");
const Tour = require("./../models/tourModel");

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: "Success",
  //   results: tours.length,
  //   data: { tours },
  // });
};
exports.getTour = (req, res) => {
  // const tour = tours.find((el) => +el.id === id);
  // res.status(!tour ? 404 : 200).json({
  //   status: !tour ? "Not Found" : "Success",
  //   data: {
  //     tour,
  //   },
  // });
};
exports.createTour = (req, res) => {
  res.status(201).json({
    status: "Success",
    // results: tours.length,
    // data: { tour: newTour },
  });
};
exports.updateTour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: {
      tours: "Updated tour here...",
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: null,
  });
};
