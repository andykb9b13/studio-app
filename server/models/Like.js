const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Like = model("Like", likeSchema);

module.exports = Like;
