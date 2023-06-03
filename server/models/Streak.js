const { Schema, model } = require("mongoose");

const streakSchema = new Schema({
  date: {
    type: String,
  },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
  },
  numTries: {
    type: Number,
  },
  numSuccess: {
    type: Number,
  },
  numFail: {
    type: Number,
  },
});

const Streak = model("Streak", streakSchema);

module.exports = Streak;
