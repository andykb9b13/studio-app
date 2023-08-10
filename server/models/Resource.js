import { Schema, model } from "mongoose";
import { StringSchema } from "yup";

const resourceSchema = new Schema({
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
