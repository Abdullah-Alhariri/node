const express = require('express');
const viewsController = require('./../controllers/viewsController');
const router = express.Router();
// const userController = require('./../controllers/userController');
// const authController = require('./../controllers/authController');

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);

module.exports = router;
