const user_login = require("./user_controller/user_login");
const user_token_login = require("./user_controller/user_token_login");
const user_register = require("./user_controller/user_signup");
const upload_profile_pic = require("./user_controller/upload_profile_pic");
const delete_user = require("./user_controller/delete_user");
const list_of_users = require("./user_controller/list_of_users.js");
const user_data = require("./user_controller/user_data.js");
const user_signup_otp_validator = require("./user_controller/user_signup_otp_validator.js");
const forgot_password_opt =
  require("./user_controller/forgot_password.js").forgotPasswordOTP;
const forgot_password =
  require("./user_controller/forgot_password.js").forgotPassword;

const user_controller_exports = {
  user_login,
  user_token_login,
  user_register,
  upload_profile_pic,
  delete_user,
  list_of_users,
  user_data,
  user_signup_otp_validator,
  forgot_password_opt,
  forgot_password,
};

module.exports = user_controller_exports;
