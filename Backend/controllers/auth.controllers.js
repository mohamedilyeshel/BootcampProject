const userModel = require("../models/user.models");

// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
module.exports.register = async (req, res, next) => {
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

// @desc Login a user
// @route POST /api/v1/auth/login
// @access Public
module.exports.login = async (req, res, next) => {
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
