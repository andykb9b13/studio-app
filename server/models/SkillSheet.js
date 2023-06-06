const { Schema, model } = require("mongoose");

const skillSheetSchema = new Schema({
  sheetNumber: {
    type: Number,
    required: true,
  },
  sheetName: {
    type: String,
    required: true,
  },
  scales: [
    {
      type: String,
      trim: true,
    },
  ],
  arpeggios: [
    {
      type: String,
      trim: true,
    },
  ],
  articulation: [
    {
      type: String,
      trim: true,
    },
  ],
  slurs: [
    {
      type: String,
      trim: true,
    },
  ],
  longTones: [
    {
      type: String,
      trim: true,
    },
  ],
  exercises: [
    {
      type: String,
      trim: true,
    },
  ],
  etudes: [
    {
      type: String,
      trim: true,
    },
  ],
  pieces: [
    {
      type: String,
      trim: true,
    },
  ],
  completed: {
    type: Boolean,
  },
});

const SkillSheet = model("SkillSheet", skillSheetSchema);

module.exports = SkillSheet;
