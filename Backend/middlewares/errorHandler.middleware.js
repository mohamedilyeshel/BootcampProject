module.exports = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};
