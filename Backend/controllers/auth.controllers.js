const userModel = require("../models/user.models");
const errorHandClass = require("../utils/errorHandClass.utils");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../config/config.env" });

// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
module.exports.register = async (req, res, next) => {
  try {
    const infos = req.body;

    const existUser = await userModel.findOne({ email: infos.email });

    if (existUser) {
      return next(new errorHandClass("Email already exists", 422));
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPass = await bcrypt.hash(infos.password, salt);

    const newUser = new userModel({
      name: infos.name,
      email: infos.email,
      password: hashedPass,
      role: infos.role,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      error: null,
      data: "User Created",
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
    const infos = req.body;

    const existUser = await userModel
      .findOne({
        email: infos.email,
      })
      .select("+password");

    if (!existUser) {
      return next(new errorHandClass("Wrong Email/Password", 400));
    }

    const correctPass = await bcrypt.compare(
      infos.password,
      existUser.password
    );

    if (!correctPass) {
      return next(new errorHandClass("Wrong Email/Password", 400));
    }

    await existUser.updateOne({ lastLogin: Date.now() });

    const token = existUser.signToken();

    return res.status(200).json({
      success: true,
      error: null,
      token,
    });
  } catch (err) {
    next(err);
  }
};
