const { Schema, model } = require("mongoose");

const skillSheetSchema = new Schema({
  sheetName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
  },
  description: {
    type: String,
  },
  scales: {
    type: String,
    trim: true,
  },
  exercises: {
    type: String,
    trim: true,
  },
  etudes: {
    type: String,
    trim: true,
  },
  pieces: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
  },
  badgeId: {
    type: Number,
  },
  difficulty: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const SkillSheet = model("SkillSheet", skillSheetSchema);

module.exports = SkillSheet;
