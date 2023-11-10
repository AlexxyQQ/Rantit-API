const postModel = require("../../models/post_model");
const User = require("../../models/user_model");

async function likeUnlikePost(req, res) {
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

    // Check if the user has already liked the post
    const post = await postModel.findOne({ _id: postID, likes: dbUser.id });

    if (post) {
      // User has already liked the post, so unlike it
      await postModel.findByIdAndUpdate(
        { _id: postID },
        { $pull: { likes: dbUser.id } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
      });
    } else {
      // User has not liked the post, so like it
      await postModel.findByIdAndUpdate(
        { _id: postID },
        { $addToSet: { likes: dbUser.id } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Post liked successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = likeUnlikePost;
