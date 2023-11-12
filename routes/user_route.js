const express = require("express");
const user_controller = require("../controllers/user_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");

const userRouter = express.Router();

userRouter.route("/signup").post(user_controller.user_register);
userRouter.route("/login").post(user_controller.user_login);
userRouter
  .route("/loginWithToken")
  .get(verifyUser, user_controller.user_token_login);
userRouter
  .route("/uploadProfilePic")
  .post(verifyUser, user_controller.upload_profile_pic);

userRouter.route("/deleteUser").post(verifyUser, user_controller.delete_user);
userRouter
  .route("/getListofUsers")
  .get(verifyUser, user_controller.list_of_users);
userRouter.route("/getUserData").post(verifyUser, user_controller.user_data);
userRouter
  .route("/otpValidator")
  .post(user_controller.user_signup_otp_validator);
userRouter
  .route("/forgotPasswordOTP")
  .post(user_controller.forgot_password_opt);
userRouter.route("/forgotPassword").post(user_controller.forgot_password);

module.exports = userRouter;
