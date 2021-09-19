// const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// const factory = require('./handlerFactory');

exports.getOverview = ('/overview',
(req, res) =>
  res.status(200).render('overview', {
    title: 'All tours'
  }));

exports.getTour = ('/tour',
(req, res) =>
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour' // jsut for placeholder
  }));
