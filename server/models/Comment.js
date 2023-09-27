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
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
