const User = require("../models/userModel");

const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
