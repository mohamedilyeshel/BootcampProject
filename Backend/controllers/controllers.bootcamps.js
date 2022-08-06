// @desc Get all bootcamps
// @route /api/v1/bootcamps
// @access Public
module.exports.getBootcamps = (req, res) => {
  res.status(200).json({ id: 1, name: "omk" });
};

// @desc Get one bootcamp with a specific id
// @route /api/v1/bootcamps/:id
// @access Public
module.exports.getBootcamp = (req, res) => {
  res.status(200).json({ id: req.params.id, name: "omk" });
};

// @desc Create a new bootcamp
// @route /api/v1/bootcamps
// @access Private
module.exports.createBootcamp = (req, res) => {
  res.status(200).json("created");
};

// @desc Update a bootcamp
// @route /api/v1/bootcamps/:id
// @access Private
module.exports.updateBootcamp = (req, res) => {
  res.status(200).json("updated" + req.params.id);
};

// @desc Delete a bootcamp
// @route /api/v1/bootcamps/:id
// @access Private
module.exports.deleteBootcamp = (req, res) => {
  res.status(200).json("deleted" + req.params.id);
};
