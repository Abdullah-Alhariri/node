const express = require('express');
const viewsController = require('./../controllers/viewsController');
const router = express.Router();
// const userController = require('./../controllers/userController');
// const authController = require('./../controllers/authController');

router.get('/', viewsController.getOverview);
router.get('/tour', viewsController.getTour);

module.exports = router;
