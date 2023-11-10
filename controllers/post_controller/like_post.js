const postModel = require("../../models/post_model");
const User = require("../../models/user_model");

async function likePost(req, res) {
  try {
    const localUser = res.locals.user;

    const dbUser = await User.findOne({ _id: localUser.id });

    if (!dbUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    const { postID } = req.body;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required!",
      });
    }

    const post = await postModel.findOneAndUpdate(
      { _id: postID },
      { $addToSet: { likes: dbUser.id } },
      { new: true }
    );

    if (!post) {
      return res.status(400).json({
        success: false,
        message: post ? "You already liked this post!" : "Post does not exist!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post liked successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = likePost;
