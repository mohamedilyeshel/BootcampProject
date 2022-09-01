const router = require("express").Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps.controllers");
const bootcampModel = require("../models/bootcamp.models");
const errorHandlerClass = require("../utils/errorHandClass.utils");
const optionsMiddleware = require("../middlewares/options.middlewares");

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
router
  .route("/")
  .get(optionsMiddleware(bootcampModel), getBootcamps)
  .post(createBootcamp);
router
  .route("/:bootcamp")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
