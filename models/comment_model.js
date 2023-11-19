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
    default: null, // Set the default value to null
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to set user to null when type is "anonymous"
commentSchema.pre("save", function (next) {
  if (this.type === "anonymous") {
    this.user = null;
  }
  next();
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
