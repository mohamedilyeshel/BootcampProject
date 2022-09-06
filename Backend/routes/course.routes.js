const {
  getCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controllers");
const optionsMiddlewares = require("../middlewares/options.middlewares");
const router = require("express").Router();
const courseModel = require("../models/course.models");
const ErrorHandler = require("../utils/errorHandClass.utils");

router.param("course", async (req, res, next, id) => {
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    req.course = course;
    next();
  } catch (err) {
    next(err);
  }
});

router
  .route("/")
  .get(optionsMiddlewares(courseModel), getCourses)
  .post(createCourse);
router.route("/:course").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
