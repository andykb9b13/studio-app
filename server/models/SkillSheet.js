const { Schema, model } = require("mongoose");

const skillSheetSchema = new Schema({
  scales: {
    type: String,
  },
  articulation: {
    type: String,
  },
  slurs: {
    type: String,
  },
  longTones: {
    type: String,
  },
  exercises: {
    type: String,
  },
  etudes: {
    type: String,
  },
  pieces: {
    type: String,
  },
  compleated: {
    type: Boolean,
  },
  sheetNumber: {
    type: Number,
  },
});

const SkillSheet = model("SkillSheet", skillSheetSchema);

module.exports = SkillSheet;
