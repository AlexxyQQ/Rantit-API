const User = require("../../models/user_model");

async function otpValidator(req, res) {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide Email and OTP!",
      });
    }

    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      if (existingUserEmail.otp === otp.toString()) {
        existingUserEmail.verified = true;
        existingUserEmail.otp = null;
        await existingUserEmail.save();

        return res.status(200).json({
          success: true,
          message: "OTP verified successfully!",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP!",
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "User not found with the provided email!",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = otpValidator;
