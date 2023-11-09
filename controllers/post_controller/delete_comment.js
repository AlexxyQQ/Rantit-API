const Comment = require("../../models/comment_model");

async function deleteComment(req, res) {
  try {
    const localUser = res.locals.user;

    const { commentID } = req.body;

    if (!commentID) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required!",
      });
    }

    const comment = await Comment.findOneAndDelete({
      _id: commentID,
      user: localUser.id,
    });

    if (!comment) {
      return res.status(400).json({
        success: false,
        message:
          "Comment does not exist or you are not authorized to delete it!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = deleteComment;
