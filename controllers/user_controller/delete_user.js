const User = require("../../models/user_model");

async function deleteUser(req, res) {
  try {
    const localUser = res.locals.user;

    const dbUser = await User.findById(localUser.id);
    if (!dbUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    await User.findByIdAndDelete(localUser.id);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = deleteUser;
