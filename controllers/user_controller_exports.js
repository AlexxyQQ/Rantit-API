const user_login = require("./user_controller/user_login");
const user_token_login = require("./user_controller/user_token_login");
const user_register = require("./user_controller/user_signup");
const uploadProfilePic = require("./user_controller/upload_profile_pic");
const deleteUser = require("./user_controller/delete_user");
const listofUsers = require("./user_controller/list_of_users.js");
const userData = require("./user_controller/user_data.js");
const otpValidator = require("./user_controller/user_otp_validator.js");

const user_controller_exports = {
  user_login,
  user_token_login,
  user_register,
  uploadProfilePic,
  deleteUser,
  listofUsers,
  userData,
  otpValidator,
};

module.exports = user_controller_exports;
