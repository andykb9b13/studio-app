const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new Schema({
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
    minLength: 8,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  practiceHistory: {
    type: Schema.Types.ObjectId,
    ref: "PracticeHistory",
  },
  skillSheets: [
    {
      type: Schema.Types.ObjectId,
      ref: "SkillSheet",
    },
  ],
});

// hash user password
teacherSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
teacherSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
