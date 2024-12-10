const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  style: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
