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

    // get owner of each post and users who liked any post
    const [postOwners, users] = await Promise.all([
      User.find({ _id: { $in: posts.map((post) => post.user._id) } })
        .select("-password -otp")
        .lean(),
      User.find({
        _id: {
          $in: [
            ...new Set(
              posts.reduce(
                (ids, post) => ids.concat(post.likes.slice(0, 10)),
                []
              )
            ),
          ],
        },
      })
        .select("-password -otp")
        .lean(),
    ]);

    // get only the first 10 comments for all posts
    const comments = await commentModel
      .find({
        post: { $in: posts.map((post) => post._id) },
      })
      .limit(10);

    // map users and comments to their respective posts
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const postLikers = users
          .filter((user) => post.likes.includes(user._id))
          .slice(0, 10);
        const postComments = comments
          .filter((comment) => comment.post.equals(post._id))
          .slice(0, 10);
        const postOwner = postOwners.find((user) =>
          post.user._id.equals(user._id)
        );

        // create a new object with only the necessary details
        return {
          _id: post._id,
          user: postOwner,
          content: post.content,
          likes: postLikers,
          comments: postComments,
          createdAt: post.createdAt,
        };
      })
    );

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
