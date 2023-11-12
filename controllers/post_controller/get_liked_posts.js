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
    const posts = await postModel.find().skip(skip).limit(perPage);

    // filter the post liked by the logged-in user
    const likedPosts = [];

    for (const post of posts) {
      if (post.likes.includes(localUser.id)) {
        let postCopy = JSON.parse(JSON.stringify(post)); // Make a copy of the post object

        if (postCopy.likes.length > 0) {
          const users = await User.find({ _id: { $in: postCopy.likes } });
          postCopy.likes = users.map((user) => {
            user.password = undefined;
            user.otp = undefined;
            return user;
          });
        }

        if (postCopy.comment.length > 0) {
          const comments = await commentModel.find({ post: postCopy._id });
          postCopy.comment = comments;
        }

        likedPosts.push(postCopy);
      }
    }

    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully",
      current_page: page,
      data: likedPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getLikedPosts;
