const userModel = require("../models/user.models");

// @desc Get a user
// @route GET /api/v1/users/:user
// @access Private
module.exports.getUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      error: null,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get users
// @route GET /api/v1/users/
// @access Private
module.exports.getUsers = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      error: null,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Update a user
// @route PUT /api/v1/users/:user
// @access Private
module.exports.updateUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      error: null,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a user
// @route DELETE /api/v1/users/:user
// @access Private
module.exports.deleteUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      error: null,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
