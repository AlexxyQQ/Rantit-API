const User = require("../../models/user_model");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");

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
        message: "User created successfully!",
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
        message: "User created successfully!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = signup;

function generateOTP() {
  // Define the character set for your OTP (you can customize this)
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}

async function sendEmail(recipientEmail, emailSubject, emailText) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: emailSubject,
    text: emailText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
