const postModel = require("../../models/post_model");
const User = require("../../models/user_model");

async function createPost(req, res) {
  try {
    const localUser = res.locals.user;

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required!",
      });
    }

    const newPost = {
      content,
      user: localUser.id,
    };

    const post = await postModel.create(newPost);

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = createPost;
