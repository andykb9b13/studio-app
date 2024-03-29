const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minLength: [8, "Passwords must be at least 8 characters"],
    required: [true, "Password is required"],
  },
  avatarId: {
    type: Number,
  },
  aboutInfo: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  username: {
    type: String,
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
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  pieces: [
    {
    type: 
      Schema.Types.ObjectId,
      ref: "Piece"
    }
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
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

teacherSchema.virtual("resourceTypes").get(function () {
  let resourceTypes = [];
  if (this.resources && this.resources.length > 0) {
    this.resources.forEach((resource) => {
      if (resource.resourceType !== null)
        resourceTypes.push(resource.resourceType);
    });
  }
  return resourceTypes;
});

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
