const User = require("../../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: !email ? "Please provide email!" : "Please provide password!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist!",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        type: user.type,
        profilePic: user.profilePic,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: { user, token: token },
      message: "User logged in successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = login;
