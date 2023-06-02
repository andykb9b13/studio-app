const { Schema, model } = require("mongoose");

const practiceHistorySchema = new Schema({
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

// create a virtual that shows days practiced and hours practiced
const PracticeHistory = model("PracticeHistory", practiceHistorySchema);

module.exports = PracticeHistory;
