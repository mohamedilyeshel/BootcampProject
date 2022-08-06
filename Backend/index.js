// Import Section
const express = require("express");
require("dotenv").config({ path : "./config.env" });
const app = express();

// DB connection


// Import Routes


// Middlewares


// Routes Middlewares


// Start Server on port 8000
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server working!!!", process.env.PORT, process.env.NODE_ENV);
})