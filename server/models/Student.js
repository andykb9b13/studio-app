const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: 20,
    minLength: 6,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  primaryContact: {
    type: String,
  },
  primaryContactEmail: {
    type: String,
  },
  instrument: {
    type: String,
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
  practicePlans: [
    {
      type: Schema.Types.ObjectId,
      ref: "PracticePlan",
    },
  ],
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

// Define a virtual property for total points worth
studentSchema.virtual("totalPlanPoints").get(function () {
  let totalPointsArr = [];
  if (this.practicePlans && this.practicePlans.length > 0) {
    this.practicePlans.forEach((plan) =>
      plan.assignments.forEach((assignment) =>
        totalPointsArr.push(assignment.pointsWorth)
      )
    );
  }
  const filteredArr = totalPointsArr.filter((points) => points !== undefined);
  const totalPoints = filteredArr.reduce((acc, curr) => acc + curr, 0);
  return totalPoints;
});

studentSchema.virtual("totalCompletedPoints").get(function () {
  let pointsArr = [];
  let completedAssignArr = [];

  if (this.practicePlans && this.practicePlans.length > 0) {
    this.practicePlans.forEach((plan) => {
      plan.assignments.forEach((assignment) => {
        if (assignment.completed === true) {
          completedAssignArr.push(assignment);
        }
      });
    });
  }

  completedAssignArr.forEach((assign) => {
    if (assign.pointsWorth !== undefined) {
      pointsArr.push(assign.pointsWorth);
    }
  });

  const totalPoints = pointsArr.reduce((acc, curr) => acc + curr, 0);
  return totalPoints;
});

const Student = model("Student", studentSchema);

module.exports = Student;
