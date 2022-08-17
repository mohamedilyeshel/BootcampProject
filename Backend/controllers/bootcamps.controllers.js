const bootcampModel = require("../models/bootcamp.models");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps/
// @access Public
module.exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await bootcampModel.find();
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
