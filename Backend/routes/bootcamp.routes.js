const router = require("express").Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps.controllers");

// router.get("/", getBootcamps);
// router.get("/:id", getBootcamp);
// router.post("/", createBootcamp);
// router.put("/:id", updateBootcamp);
// router.delete("/:id", deleteBootcamp);

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
