const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema({
  exerciseName: {
    type: String,
  },
  studentId: {
    type: String,
  },
  planId: {
    type: String,
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
    type: String,
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
