const postModel = require("../../models/post_model");
const User = require("../../models/user_model");

async function deletePost(req, res) {
  try {
    const localUser = res.locals.user;

    const { postID } = req.body;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required!",
      });
    }

    const post = await postModel.findOneAndDelete({
      _id: postID,
      user: localUser.id,
    });

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist or you are not authorized to delete it!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = deletePost;
