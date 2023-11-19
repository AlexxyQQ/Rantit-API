const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, "The comment is required"],
  },
  type: {
    type: String,
    enum: ["public", "anonymous"],
    default: "public",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
