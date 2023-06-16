const { Schema, model } = require("mongoose");

const practicePlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
  skillSheets: [
    {
      type: Schema.Types.ObjectId,
      ref: "SkillSheet",
    },
  ],
});

const practicePlan = model("PracticePlan", practicePlanSchema);

module.exports = practicePlan;
