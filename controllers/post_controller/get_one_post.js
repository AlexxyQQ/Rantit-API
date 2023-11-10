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
    // get users who liked the post
    const users = await User.find({ _id: { $in: post.likes } });
    // get comments
    const comments = await commentModel.find({ post: contentID });

    // remove the like and comment fields from the post
    post.likes = undefined;
    post.comment = undefined;

    // add the users who liked the post to the post
    post.likes = users;
    // add the comments to the post
    post.comment = comments;

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
