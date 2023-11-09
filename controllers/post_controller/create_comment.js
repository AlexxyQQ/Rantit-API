const Comment = require("../../models/comment_model");

async function createComment(req, res) {
  try {
    const localUser = res.locals.user;

    const { contentID, comment } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required!",
      });
    }

    const newComment = {
      comment,
      user: localUser.id,
      post: contentID,
    };

    const createdComment = await Comment.create(newComment);

    res.status(200).json({
      success: true,
      message: "Comment created successfully",
      data: createdComment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = createComment;
