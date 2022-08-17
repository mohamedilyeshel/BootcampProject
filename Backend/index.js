// Import Section
const express = require("express");
const morgan = require("morgan");
const connectDb = require("./config/db");
const color = require("@colors/colors");
require("dotenv").config({ path: __dirname + "/config/config.env" });
const app = express();
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");

// DB connection
connectDb();

// Import Routes
const bootcampRoutes = require("./routes/bootcamp.routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes Middlewares (Mount routers)
app.use("/api/v1/bootcamps", bootcampRoutes);

// Error Handler Middleware
app.use(errorHandlerMiddleware);

// Start Server on port 8000
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    color.blue.bold("Server working!!!", process.env.PORT, process.env.NODE_ENV)
  );
});
