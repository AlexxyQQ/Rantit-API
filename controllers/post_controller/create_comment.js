const Comment = require("../../models/comment_model");
const Post = require("../../models/post_model");

async function createComment(req, res) {
  try {
    const localUser = res.locals.user;

    const { contentID, comment } = req.body;

    if (!contentID) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required!",
      });
    }

    const newComment = {
      comment,
      user: localUser.id,
      post: contentID,
    };

    // check if post exists
    const postExists = await Post.exists({ _id: contentID });

    if (!postExists) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist!",
      });
    }
    const createdComment = await Comment.create(newComment);
    // add comment to post
    const post = await Post.findOneAndUpdate(
      { _id: contentID },
      { $push: { comments: createdComment._id } }, // corrected field name to 'comments'
      { new: true }
    );

    if (!post) {
      // If the post doesn't exist, you can handle it here
      return res.status(400).json({
        success: false,
        message: "Post does not exist!",
      });
    }

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