const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema({
  exerciseName: {
    type: String,
    required: [true, "Please enter a name for the exercise"],
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
  pointsWorth: {
    type: Number,
  },
  completed: {
    type: Boolean,
  },
  streaks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Streak",
    },
  ],
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  resourceUrl: {
    type: String,
  },
});

const Assignment = model("Assignment", assignmentSchema);

module.exports = Assignment;
