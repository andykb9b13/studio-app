const { Schema, model } = require("mongoose");

const streakSchema = new Schema({
  date: {
    type: Date,
  },
  studentId: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  totalTries: {
    type: Number,
    required: true,
  },
  successes: {
    type: Number,
    required: true,
  },
  blunders: {
    type: Number,
    required: true,
  },
  mostInARow: {
    type: Number,
  },
  successPercentage: {
    type: Number,
  },
});

const Streak = model("Streak", streakSchema);

module.exports = Streak;
