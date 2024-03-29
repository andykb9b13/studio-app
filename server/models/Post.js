const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  studioId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  isTeacher: {
    type: Boolean,
    required: true,
  },
  likes: { type: Number },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
