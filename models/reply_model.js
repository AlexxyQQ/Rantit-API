const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  reply: {
    type: String,
    required: [true, "The reply is required"],
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
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const replyModel = mongoose.model("Reply", replySchema);

module.exports = replyModel;
