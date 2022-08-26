const NodeGeocoder = require("node-geocoder");
require("dotenv").config({ path: __dirname + "/config/config.env" });

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_KEY,
  formatter: null,
};

module.exports = NodeGeocoder(options);
