const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  authorId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  isTeacher: {
    type: Boolean,
    required: true,
  },
  likes: { type: Number },
  postId: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
