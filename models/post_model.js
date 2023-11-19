const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "The content is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    default: null, // Set the default value to null
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

// Add a pre-save hook to set user to null when type is "anonymous"
postSchema.pre("save", function (next) {
  if (this.type === "anonymous") {
    this.user = null;
  }
  next();
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
