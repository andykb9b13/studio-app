const { Schema, model } = require("mongoose");

const weeklyPlanSchema = new Schema({
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

const weeklyPlan = model("WeeklyPlan", weeklyPlanSchema);

module.exports = weeklyPlan;
