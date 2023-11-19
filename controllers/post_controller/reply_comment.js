const Comment = require("../../models/comment_model");
const Post = require("../../models/post_model");
const Reply = require("../../models/reply_model");

async function replyComment(req, res) {
  try {
    const localUser = res.locals.user;

    const { commentID, reply, type } = req.body;

    if (!commentID) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required!",
      });
    }

    console.log(localUser);

    // check if comment exists
    const commentExists = await Comment.exists({ _id: commentID });
    if (!commentExists) {
      return res.status(400).json({
        success: false,
        message: "Comment does not exist!",
      });
    }

    const comment = await Comment.findOne({ _id: commentID });

    const newReply = {
      reply,
      type,
      user: type === "anonymous" ? null : localUser.id,
      comment: comment._id,
      post: comment.post,
    };

    // create new reply
    const replyComment = await Reply.create(newReply);

    // add reply to comment
    await Comment.findOneAndUpdate(
      { _id: commentID },
      { $push: { replies: replyComment.id } },
      { new: true }
    );

    // return reply
    return res.status(201).json({
      success: true,
      message: "Reply created successfully!",
      reply: replyComment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = replyComment;
