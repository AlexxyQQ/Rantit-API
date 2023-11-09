const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
    validate: {
      validator: (value) => {
        const re = /^[a-z0-9_]+$/;
        return value.match(re);
      },
      message: "Username should only contain lowercase letters and numbers",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email address"],
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    validate: {
      validator: (value) => {
        const re =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,20})/i;
        return value.match(re);
      },
      message:
        "Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character",
    },
  },
  profilePic: {
    type: String,
    default: "https://i.imgur.com/Eyzrkg3.jpeg",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["manual", "google"],
    default: "manual",
  },
  otp: {
    type: String,
    default: null,
  },
});

const user = mongoose.model("Users", userSchema);

module.exports = user;
