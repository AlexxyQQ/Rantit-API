const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

async function getPostsComments(req, res) {
  try {
    const postID = req.body.postID;
    const page = req.body.page || 1;
    const perPage = 10;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required!",
      });
    }

    // find post by ID
    const foundPost = await postModel.findById(postID);

    if (!foundPost) {
      return res.status(400).json({
        success: false,
        message: "Post does not exist!",
      });
    }

    // calculate the number of documents to skip
    const skip = (page - 1) * perPage;

    // get comments for the post with pagination
    const comments = await commentModel
      .find({ post: postID })
      .populate("user")
      .skip(skip)
      .limit(perPage);

    //   remove user password from comments
    comments.forEach((comment) => {
      comment.user.password = undefined;
      comment.user.otp = undefined;
    });

    res.status(200).json({
      success: true,
      current_page: page,
      message: "Comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getPostsComments;