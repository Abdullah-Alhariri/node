// const fs = require("fs");
const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "Success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "Success",
      // results: tours.length,
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data set! (change this message)",
    });
  }
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
