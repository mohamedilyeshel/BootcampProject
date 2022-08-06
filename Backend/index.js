// Import Section
const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "./config.env" });
const app = express();

// DB connection

// Import Routes
const bootcampRoutes = require("./routes/bootcamp.routes");

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes Middlewares (Mount routers)
app.use("/api/v1/bootcamps", bootcampRoutes);

// Start Server on port 8000
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server working!!!", process.env.PORT, process.env.NODE_ENV);
});
