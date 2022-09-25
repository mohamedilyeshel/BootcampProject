const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: __dirname + "../config/config.env",
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["user", "publisher", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmEmailToken: String,
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    twoFactorCode: String,
    twoFactorCodeExpire: Date,
    twoFactorEnable: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.signToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.HOURS_TO_EXPIRE_TOKEN,
    }
  );
};

userSchema.methods.sendTokenCookies = function (res) {
  const MINUTES_CONVERT = 60;
  const SECONDS_CONVERT = 60;
  const MS_CONVERT = 1000;

  const token = this.signToken();

  const options = {
    expires: new Date(
      Date.now() +
        process.env.HOURS_TO_EXPIRE_COOKIE *
          MINUTES_CONVERT *
          SECONDS_CONVERT *
          MS_CONVERT
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV !== "development") {
    options.secure = true;
  }

  return res.status(200).cookie("Token", token, options).json({
    success: true,
    error: null,
    token,
  });
};

module.exports = mongoose.model("User", userSchema);
