const express = require("express");
// eslint-disable-next-line import/extensions
const userController = require("../controllers/userController.js");
// eslint-disable-next-line import/extensions
const authController = require("../controllers/authController.js");
const router = express.Router();

router.post("/signup", authController.signup);
router.route("/").get(userController.getAllUsers).post(userController.createUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUsers)
  .delete(userController.deleteUser);

module.exports = router;
