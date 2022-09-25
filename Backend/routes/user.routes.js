const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
const router = require("express").Router();
const userModel = require("../models/user.models");
const errorHandlerClass = require("../utils/errorHandClass.utils");

router.param("user", async (req, res, next, id) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return next(new errorHandlerClass("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

router.route("/").get(getUsers);
router.route("/:user").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
