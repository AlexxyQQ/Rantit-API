const generateOTP = require("../../common/otp_generator");
const sendEmail = require("../../common/send_email");
const User = require("../../models/user_model");
const bcryptjs = require("bcryptjs");

async function forgotPasswordOTP(req, res) {
  try {
    const { email } = req.body;
    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Email!" });
    }
    // Check if user exists with the same email
    const exist = await User.findOne({ email });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }
    // Generate OTP
    const sixDigitOTP = generateOTP();

    // Send OTP to email
    await sendEmail(
      email, // Recipient's email address
      "Forgot Password OTP for Rantit", // Email subject
      `The OTP for your email is ${sixDigitOTP}.` // Plain text body
    );

    // Save OTP in the database
    np = await User.findOneAndUpdate(
      { email },
      { $set: { otp: sixDigitOTP } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "OTP sent to your email!",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
async function forgotPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;
    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Email!" });
    }
    // Check if user exists with the same email
    const exist = await User.findOne({ email });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }
    // Check if OTP is provided
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide OTP!" });
    }

    // Check if OTP is correct
    if (exist.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect OTP!" });
    }
    // Check if new password is provided
    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a new password!" });
    }
    // Update password
    const hashedPassword = await bcryptjs.hash(newPassword, 12);
    exist.password = hashedPassword;
    exist.otp = undefined;
    await exist.save();

    // Send email to user that password has been changed
    await sendEmail(
      email, // Recipient's email address
      "Password Changed", // Email subject
      `Your password has been changed for the email: ${exist.email}` // Plain text body
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = { forgotPasswordOTP, forgotPassword };
