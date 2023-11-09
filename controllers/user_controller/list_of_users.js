const User = require("../../models/user_model");

async function listofUsers(req, res) {
  try {
    const localUser = res.locals.user;

    if (localUser.username === "admin") {
      const dbUsers = await User.find();

      res.status(200).json({ message: "All Users", userList: dbUsers });
    } else {
      res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = listofUsers;
