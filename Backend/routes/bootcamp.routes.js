const router = require("express").Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps.controllers");
const bootcampModel = require("../models/bootcamp.models");

router.param("bootcamp", async (req, res, next, id) => {
  try {
    const bootcamp = await bootcampModel.findById(id);
    if (!bootcamp) {
      return res.status(404).json({
        success: false,
        error: "Bootcamp Not Found!",
      });
    }
    req.bootcamp = bootcamp;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// router.get("/", getBootcamps);
// router.get("/:id", getBootcamp);
// router.post("/", createBootcamp);
// router.put("/:id", updateBootcamp);
// router.delete("/:id", deleteBootcamp);

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:bootcamp")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
