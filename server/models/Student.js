const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Teacher = require("./Teacher");
const PracticeHistory = require("./PracticeHistory");

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
    required: true,
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    maxLength: 20,
    minLength: 8,
    required: true,
  },
  primaryContact: {
    type: String,
  },
  primaryContactEmail: {
    type: String,
    required: true,
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
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  practiceHistory: {
    type: Schema.Types.ObjectId,
    ref: "PracticeHistory",
  },
});

// hash user password
studentSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
studentSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Student = model("Student", studentSchema);

module.exports = Student;
