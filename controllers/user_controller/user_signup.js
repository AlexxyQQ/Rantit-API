const User = require("../../models/user_model");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../../common/send_email");
const generateOTP = require("../../common/otp_generator");

async function signup(req, res) {
  console.log("Signup route hit");
  try {
    const { username, email, password, confirmPassword, type } = req.body;
    let errorMessage = "";

    if (!username || !email || !password || !confirmPassword) {
      errorMessage = "Please provide ";
      if (!username) errorMessage += "Username, ";
      if (!email) errorMessage += "Email, ";
      if (!password) errorMessage += "Password, ";
      if (!confirmPassword) errorMessage += "Confirm Password, ";
      errorMessage = errorMessage.slice(0, -2) + "!";
    }

    const existingUserEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      errorMessage = "User with same USERNAME already exists!";
    } else if (existingUserEmail) {
      errorMessage = "User with same EMAIL already exists!";
    } else if (password !== confirmPassword) {
      errorMessage = "Passwords do not match!";
    }

    if (errorMessage) {
      return res.status(400).json({ success: false, message: errorMessage });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    if (req.body.profilePic) {
      const sixDigitOTP = generateOTP();
      let user = new User({
        username,
        email,
        password: hashedPassword,
        type,
        profilePic: req.body.profilePic,
        otp: sixDigitOTP,
      });
      await sendEmail(
        email, // Recipient's email address
        "OTP for Rantit", // Email subject
        `The OTP for your email is ${sixDigitOTP}.` // Plain text body
      );
      user = await user.save();
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePic: user.profilePic,
          verified: user.verified,
          type: user.type,
        },
        message: "OTP sent to your email please verify!",
      });
    } else {
      const sixDigitOTP = generateOTP();

      let user = new User({
        username,
        email,
        password: hashedPassword,
        type,
        otp: sixDigitOTP,
      });
      await sendEmail(
        email, // Recipient's email address
        "OTP for Rantit", // Email subject
        `The OTP for your email is ${sixDigitOTP}.` // Plain text body
      );
      user = await user.save();
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePic: user.profilePic,
          verified: user.verified,
          type: user.type,
        },
        message: "OTP sent to your email please verify!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = signup;
