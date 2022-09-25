const jwt = require("jsonwebtoken");
const errorHandClass = require("../utils/errorHandClass.utils");
const userModel = require("../models/user.models");
require("dotenv").config({ path: "../config/config.env" });

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(new errorHandClass("No token available", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return next(new errorHandClass("User dont exist", 403));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new errorHandClass("Invalid Token", 403));
  }
};

module.exports.rolesAuthorization = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!roles.includes(user.role)) {
        return next(new errorHandClass("Not authorized to get access", 401));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
