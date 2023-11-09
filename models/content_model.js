const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  contetn: {
    type: String,
    required: [true, "The content is required"],
  },
});

const content = mongoose.model("Content", contentSchema);

module.exports = content;
