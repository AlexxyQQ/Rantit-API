const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

async function getPostsLikes(req, res) {
  try {
    const postID = req.body.postID;
    const page = req.body.page || 1;
    const perPage = 20;

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

    // get likes for the post with pagination
    const likes = await User.find({ _id: foundPost.likes })
      .skip(skip)
      .limit(perPage);

    //   remove user password from likes
    likes.forEach((like) => {
      like.password = undefined;
      like.otp = undefined;
    });

    res.status(200).json({
      success: true,
      message: "Likes retrieved successfully",
      data: likes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getPostsLikes;
