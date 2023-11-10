const postModel = require("../../models/post_model");
const User = require("../../models/user_model");
const commentModel = require("../../models/comment_model");

async function getAllPosts(req, res) {
  try {
    const page = req.body.page || 1;
    const perPage = 20;

    // calculate the number of documents to skip
    const skip = (page - 1) * perPage;

    // get all posts with pagination
    const posts = await postModel.find().skip(skip).limit(perPage);

    // get user IDs who liked any post
    const likedUserIds = posts.reduce(
      (ids, post) => ids.concat(post.likes.slice(0, 10)), // Limit to the first 10 likes
      []
    );

    // get unique users who liked any post
    const uniqueLikedUserIds = [...new Set(likedUserIds)];

    // get only the first 10 users who liked any post
    const users = await User.find({
      _id: { $in: uniqueLikedUserIds.slice(0, 10) },
    });

    // get only the first 10 comments for all posts
    const comments = await commentModel
      .find({
        post: { $in: posts.map((post) => post._id) },
      })
      .limit(10);

    // map users and comments to their respective posts
    const postsWithDetails = posts.map((post) => {
      const postUsers = users
        .filter((user) => post.likes.includes(user._id))
        .slice(0, 10);
      const postComments = comments
        .filter((comment) => comment.post.equals(post._id))
        .slice(0, 10);

      // remove password from user details
      postUsers.forEach((user) => {
        user.password = undefined;
        user.otp = undefined;
      });

      // create a new object with only the necessary details
      return {
        _id: post._id,
        content: post.content,
        likes: postUsers,
        comments: postComments,
      };
    });

    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully",
      current_page: page,
      data: postsWithDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getAllPosts;
