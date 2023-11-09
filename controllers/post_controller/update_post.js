const postModel = require("../../models/post_model");
const User = require("../../models/user_model");

async function updatePost(req, res) {
  try {
    const localUser = res.locals.user;

    const { content, postID } = req.body;

    if (!postID || !content) {
      return res.status(400).json({
        success: false,
        message: "Post ID and content are required!",
      });
    }

    const post = await postModel.findOneAndUpdate(
      { _id: postID, user: localUser.id },
      { $set: { content: content } },
      { new: true }
    );

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist or you are not authorized to update it!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = updatePost;
