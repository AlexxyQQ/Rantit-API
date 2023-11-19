const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

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
    const updatedPost = await postModel
      .findById(postID)
      .populate("user", "-password -otp")
      .populate("comment")
      .populate({
        path: "comment",
        populate: {
          path: "user",
          select: "-password -otp",
        },
      })
      .populate({
        path: "comment",
        populate: {
          path: "replies",
          populate: {
            path: "user",
            select: "-password -otp",
          },
        },
      })
      .populate("likes", "-password -otp");
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = updatePost;
