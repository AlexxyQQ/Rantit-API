const User = require("../../models/user_model");

async function loginWithToken(req, res) {
  try {
    const user = await User.findOne({ email: res.locals.user["email"] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    } else {
      res.json({
        success: true,
        data: {
          user,
          token: res.locals.token,
        },
        message: "User logged in successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = loginWithToken;
