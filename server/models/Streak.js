const { Schema, model } = require("mongoose");

const streakSchema = new Schema({
  blunders: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  mostInARow: {
    type: Number,
  },
  studentId: {
    type: String,
    required: true,
  },
  successes: {
    type: Number,
    required: true,
  },
  successPercentage: {
    type: Number,
  },
  totalTries: {
    type: Number,
    required: true,
  },
});

const Streak = model("Streak", streakSchema);

module.exports = Streak;
