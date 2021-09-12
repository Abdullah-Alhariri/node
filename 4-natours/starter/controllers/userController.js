const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const User = require("../models/userModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "succes",
    messages: { users },
  });
});
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
exports.updateUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    messages: "this route is not yet defined",
  });
};
