const { Schema, model } = require("mongoose");

const resourceSchema = new Schema({
  practicePlanId: {
    type: String,
  },
  teacherId: {
    type: String,
  },
  resourceName: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Resource = model("Resource", resourceSchema);

module.exports = Resource;
