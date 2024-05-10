const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  practiceTime: {
    type: Number,
  },
  practiceDays: {
    type: Number,
  },
  goal: {
    type: String,
  },
  skillSheet: {
    type: Schema.Types.ObjectId,
    ref: "SkillSheet",
  },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;
