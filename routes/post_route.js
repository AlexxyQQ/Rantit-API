const express = require("express");
const post_controller = require("../controllers/post_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");
const io = require("../socket");

const postRouter = express.Router();

postRouter.route("/createPost").post(verifyUser, post_controller.create_post);
postRouter
  .route("/likeUnlikePost")
  .post(verifyUser, post_controller.like_unlike_post);
postRouter
  .route("/createComment")
  .post(verifyUser, post_controller.create_comment);
postRouter.route("/updatePost").post(verifyUser, post_controller.update_post);

postRouter.route("/deletePost").post(verifyUser, post_controller.delete_post);
postRouter
  .route("/deleteComment")
  .post(verifyUser, post_controller.delete_comment);

postRouter.route("/getOnePost").post(verifyUser, post_controller.get_one_post);
postRouter.route("/getAllPosts").post(verifyUser, post_controller.get_all_post);
postRouter
  .route("/getLikedPosts")
  .post(verifyUser, post_controller.get_liked_post);

postRouter
  .route("/getPostsComments")
  .post(verifyUser, post_controller.get_post_comments);

postRouter
  .route("/getPostsLikes")
  .post(verifyUser, post_controller.get_post_likes);

postRouter
  .route("/replyComment")
  .post(verifyUser, post_controller.reply_comment);

module.exports = postRouter;
