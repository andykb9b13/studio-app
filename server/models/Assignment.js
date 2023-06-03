const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  assignmentType: {
    type: String,
  },
  specialNotes: {
    type: String,
  },
  metronome: {
    type: Number,
  },
  pages: {
    type: String,
  },
  streaks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Streak",
    },
  ],
});

const Assignment = model("Assignment", assignmentSchema);

module.exports = Assignment;
