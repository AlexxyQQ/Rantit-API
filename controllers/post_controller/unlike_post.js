const postModel = require("../../models/post_model");
const User = require("../../models/user_model");

async function unlikePost(req, res) {
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

    const post = await postModel.findByIdAndUpdate(
      postID,
      { $pull: { likes: { user: localUser.id } } },
      { new: true }
    );

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist!",
      });
    }

    res.status(200).json({
      success: true,
      message: post.likes.some((like) => like.user.toString() === localUser.id)
        ? "Post unliked successfully"
        : "Post was not liked",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = unlikePost;
