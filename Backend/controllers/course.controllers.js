const courseModel = require("../models/course.models");

module.exports.getCourses = async (req, res, next) => {
  try {
    const courses = await courseModel
      .find(req.query)
      .select(req.querySelect)
      .sort(req.querySort)
      .skip(req.skip)
      .limit(req.limit)
      .populate({ path: "bootcamp" });

    return res.status(200).json({
      count: courses.length,
      pagination: req.pagination,
      success: true,
      error: "null",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getBootcampCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find({ bootcamp: req.bootcamp._id });

    return res.status(200).json({
      count: courses.length,
      pagination: req.pagination,
      success: true,
      error: "null",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getCourse = async (req, res, next) => {
  try {
    const course = req.course;
    return res.status(200).json({
      success: true,
      error: "null",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createCourse = async (req, res, next) => {
  try {
    const course = new courseModel({
      title: req.body.title,
      description: req.body.description,
      weeks: req.body.weeks,
      tuition: req.body.tuition,
      minimumSkill: req.body.minimumSkill,
      scholarshipAvailable: req.body.scholarshipAvailable,
      bootcamp: req.body.bootcamp,
    });

    const savedCourse = await course.save();
    return res.status(200).json({
      success: true,
      error: "null",
      data: savedCourse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateCourse = async (req, res, next) => {
  try {
    const courseId = req.course._id;
    const courseUpdated = await courseModel.findByIdAndUpdate(
      courseId,
      req.body,
      { runValidators: true, new: true }
    );
    return res.status(200).json({
      success: true,
      error: "null",
      data: courseUpdated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCourse = async (req, res, next) => {
  try {
    const course = req.course;
    const courseDeleted = await course.remove();

    return res.status(200).json({
      success: true,
      error: "null",
      data: courseDeleted,
    });
  } catch (err) {
    next(err);
  }
};
