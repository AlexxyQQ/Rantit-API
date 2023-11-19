const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "The content is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  type: {
    type: String,
    enum: ["public", "anonymous"],
    default: "public",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
