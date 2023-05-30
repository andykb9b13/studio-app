const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  primaryContact: {
    type: String,
  },
  primaryContactEmail: {
    type: String,
  },
  instrument: {
    type: String,
    required: true,
  },
  lessonDay: {
    type: String,
  },
  lessonTime: {
    type: String,
  },
  grade: {
    type: Number,
  },
  school: {
    type: String,
  },
  lessonLocation: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

const Student = model("Student", studentSchema);

module.exports = Student;
