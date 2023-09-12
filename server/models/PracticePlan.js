const { Schema, model } = require("mongoose");

const practicePlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
  studentId: {
    type: String,
  },
  planNotes: {
    type: String,
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
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
});

const practicePlan = model("PracticePlan", practicePlanSchema);

module.exports = practicePlan;
