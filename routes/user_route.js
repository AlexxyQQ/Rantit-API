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
  .post(verifyUser, user_controller.uploadProfilePic);

userRouter.route("/deleteUser").post(verifyUser, user_controller.deleteUser);
userRouter
  .route("/getListofUsers")
  .get(verifyUser, user_controller.listofUsers);
userRouter.route("/getUserData").post(verifyUser, user_controller.userData);
userRouter.route("/otpValidator").post(user_controller.otpValidator);

module.exports = userRouter;
