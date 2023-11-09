const express = require("express");
const post_controller = require("../controllers/post_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");

const postRouter = express.Router();

postRouter.route("/createPost").post(verifyUser, post_controller.create_post);
postRouter.route("/likePost").post(verifyUser, post_controller.like_post);
postRouter
  .route("/createComment")
  .post(verifyUser, post_controller.create_comment);
postRouter.route("/updatePost").post(verifyUser, post_controller.update_post);

postRouter.route("/deletePost").post(verifyUser, post_controller.delete_post);
postRouter
  .route("/deleteComment")
  .post(verifyUser, post_controller.delete_comment);
postRouter.route("/unlikePost").post(verifyUser, post_controller.unlike_post);

module.exports = postRouter;
