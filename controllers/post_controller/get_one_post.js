const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

async function getOnePost(req, res) {
  try {
    const localUser = res.locals.user;

    const { contentID } = req.body;

    if (!contentID) {
      return res.status(400).json({
        success: false,
        message: "ContentID is required!",
      });
    }

    // get post
    post = await postModel
      .findById(contentID)
      .populate("user", "-password -otp")
      .populate({
        path: "comment",
        populate: {
          path: "user",
          select: "-password -otp",
        },
        populate: {
          path: "replies",
          populate: {
            path: "user",
            select: "-password -otp",
          },
        },
      })
      .populate("likes", "-password -otp");

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post found successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getOnePost;
