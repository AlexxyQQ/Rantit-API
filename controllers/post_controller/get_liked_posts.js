const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

async function getLikedPosts(req, res) {
  try {
    const localUser = res.locals.user;
    const page = req.body.page || 1;
    const perPage = 20;

    // calculate the number of documents to skip
    const skip = (page - 1) * perPage;

    // get all posts with pagination
    const posts = await postModel
      .find({
        likes: { $in: [localUser.id] },
      })
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
      .populate("likes", "-password -otp")
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully",
      current_page: page,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getLikedPosts;
