const mongoose = require("mongoose");
const color = require("@colors/colors");
require("dotenv").config();

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.on("connected", () => {
    console.log("Connection to mongoDB database done".cyan.bold);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Connection lost to the mongoDB database".red.bold);
  });
  mongoose.connection.on("error", (err) => {
    console.log(color.red.bold(err));
  });
};
