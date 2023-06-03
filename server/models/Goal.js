const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  practiceTime: {
    type: Number,
  },
  practiceDays: {
    type: Number,
  },
  skillSheet: {
    type: Schema.Types.ObjectId,
    ref: "SkillSheet",
  },
});

const Goal = model("Goal", goalSchema);

modeule.exports = Goal;
