const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

async function getOnePost(req, res) {
  try {
    const localUser = res.locals.user;

    const { contentID } = req.body;

    if (!contentID) {
      return res.status(400).json({
        success: false,
        message: "ContentID is required!",
      });
    }

    // get post
    post = await postModel.findById(contentID);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist!",
      });
    }

    // get users who liked the post
    if (post.likes.length > 0) {
      const users = await User.find({ _id: { $in: post.likes } });
      post.likes = undefined;
      post.likes = users;
    }

    if (post.comment.length > 0) {
      const comments = await commentModel.find({ post: contentID });
      post.comment = undefined;
      post.comment = comments;
    }

    const a = await User.findById(post.user._id);
    a.otp = undefined;
    a.password = undefined;
    post.user = undefined;
    post.user = a;

    res.status(200).json({
      success: true,
      message: "Post found successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getOnePost;
