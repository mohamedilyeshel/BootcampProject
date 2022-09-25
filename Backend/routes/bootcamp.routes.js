const router = require("express").Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto,
} = require("../controllers/bootcamps.controllers");
const { getBootcampCourses } = require("../controllers/course.controllers");
const bootcampModel = require("../models/bootcamp.models");
const errorHandlerClass = require("../utils/errorHandClass.utils");
const optionsMiddleware = require("../middlewares/options.middlewares");
const {
  verifyToken,
  rolesAuthorization,
} = require("../middlewares/auth.middlewares");

router.param("bootcamp", async (req, res, next, id) => {
  try {
    const bootcamp = await bootcampModel.findById(id);
    // This test is used to check if nothing is returned because the id could be sent in a proper format but doesn't exists in the database
    if (!bootcamp) {
      return next(new errorHandlerClass("Bootcamp Not Found", 404));
      // throw new errorHandlerClass("Bootcamp Not Found", 404);
    }
    req.bootcamp = bootcamp;
    next();
  } catch (err) {
    next(err);
  }
});

// router.get("/", getBootcamps);
// router.get("/:id", getBootcamp);
// router.post("/", createBootcamp);
// router.put("/:id", updateBootcamp);
// router.delete("/:id", deleteBootcamp);

router.get("/radius/:country/:zipCode/:distance/:unit", getBootcampsInRadius);
router.get("/:bootcamp/courses", getBootcampCourses);
router
  .route("/")
  .get(optionsMiddleware(bootcampModel), getBootcamps)
  .post(verifyToken, rolesAuthorization("publisher", "admin"), createBootcamp);
router
  .route("/:bootcamp")
  .get(getBootcamp)
  .put(verifyToken, rolesAuthorization("publisher", "admin"), updateBootcamp)
  .delete(
    verifyToken,
    rolesAuthorization("publisher", "admin"),
    deleteBootcamp
  );
router.put(
  "/:bootcamp/upload",
  verifyToken,
  rolesAuthorization("publisher", "admin"),
  uploadBootcampPhoto
);

module.exports = router;
