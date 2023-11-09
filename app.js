const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/userRoute");
const verify = require("./middlewares/verify_token");

const app = express(); // create express app
app.use(cors({ origin: true }));

var db_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE
    : process.env.PRO_DATABASE;

mongoose
  .connect(db_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

// Dev logging middleware
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
module.exports = app; // export app

// Routes
app.use("/api/users", verify.verifyAPIReq, userRoutes);
