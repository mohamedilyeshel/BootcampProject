const geoCoder = require("../utils/geocoder.utils");
const bootcampModel = require("../models/bootcamp.models");
const ErrorHandler = require("../utils/errorHandClass.utils");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps/
// @access Public
module.exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await bootcampModel
      .find(req.query)
      .select(req.querySelect)
      .sort(req.querySort)
      .skip(req.skip)
      .limit(req.limit)
      .populate("courses");

    return res.status(200).json({
      count: bootcamps.length,
      pagination: req.pagination,
      success: true,
      error: "null",
      data: bootcamps,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get one bootcamp with a specific id
// @route GET /api/v1/bootcamps/:bootcamp
// @access Public
module.exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = req.bootcamp;
    return res.status(200).json({
      success: true,
      error: "null",
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Create a new bootcamp
// @route POST /api/v1/bootcamps/
// @access Private
module.exports.createBootcamp = async (req, res, next) => {
  try {
    const bootCamp = new bootcampModel({
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      careers: req.body.careers,
      housing: req.body.housing,
      jobAssistance: req.body.jobAssistance,
      jobGuarantee: req.body.jobGuarantee,
      acceptGi: req.body.acceptGi,
    });

    const savedBoot = await bootCamp.save();

    return res.status(200).json({
      success: true,
      error: "null",
      data: savedBoot,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:bootcamp
// @access Private
module.exports.updateBootcamp = async (req, res, next) => {
  try {
    const id = req.bootcamp._id;
    const bootcamp = await bootcampModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      success: true,
      error: "null",
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:bootcamp
// @access Private
module.exports.deleteBootcamp = async (req, res, next) => {
  try {
    const id = req.bootcamp._id;
    const bootcamp = await bootcampModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      error: "null",
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get all bootcamps within a specified zipCode area
// @route GET /api/v1/bootcamps/radius/:country/:zipCode/:distance/:unit
// @access Public
module.exports.getBootcampsInRadius = async (req, res, next) => {
  try {
    const { country, zipCode, distance, unit } = req.params;

    // Get the latitude and the longitude of the point we want to make the search circle from it (using zipCodes, cities, address, country etc ...)
    const location = await geoCoder.geocode({
      zipcode: zipCode,
      country: country,
    });
    const long = location[0].longitude;
    const lat = location[0].latitude;
    let radius = 0;

    // Calculate the radius of the search circle by dividing the given distance by the earth's radius
    if (unit.toLowerCase() === "mi") {
      radius = distance / 3963;
    } else if (unit.toLowerCase() === "km") {
      radius = distance / 6378;
    } else {
      next(
        new ErrorHandler("The unit should be mi (miles) or km (kilometers)")
      );
    }

    // Get the bootcamps that are within the radius of the point we want by using the property geoWithin and centerSphere
    const bootcamps = await bootcampModel.find({
      location: { $geoWithin: { $centerSphere: [[long, lat], radius] } },
    });
    return res.status(200).json({
      count: bootcamps.length,
      success: true,
      error: "null",
      data: bootcamps,
    });
  } catch (err) {
    next(err);
  }
};
