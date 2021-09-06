const express = require("express");
const userContconst = require("./../controllers/userController.js");

const router = express.Router();

router.route("/").get(userContconst.getAllUsers).post(userContconst.createUsers);
router
  .route("/:id")
  .get(userContconst.getUser)
  .patch(userContconst.updateUsers)
  .delete(userContconst.deleteUser);

module.exports = router;
