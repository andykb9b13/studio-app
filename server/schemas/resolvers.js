const {
  Student,
  Teacher,
  Assignment,
  Goal,
  SkillSheet,
  Streak,
  PracticePlan,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { findById } = require("../models/Student");

const resolvers = {
  Query: {
    students: async () => {
      return await Student.find({})
        .populate({
          path: "practicePlans",
          populate: {
            path: "assignments",
            model: "Assignment",
          },
        })
        .populate("assignments");
    },
    student: async (parent, { studentId: _id }) => {
      return await Student.findById(_id)
        .populate({
          path: "practicePlans",
          populate: {
            path: "assignments",
            model: "Assignment",
          },
        })
        .populate("assignments");
    },
    teachers: async () => {
      return await Teacher.find({})
        .populate("students")
        .populate("skillSheets");
    },
    teacher: async (parent, { teacherId: _id }) => {
      return await Teacher.findById(_id)
        .populate("students")
        .populate("skillSheets");
    },
    assignments: async () => {
      return await Assignment.find({});
    },
    assignment: async (parent, { assignmentId: _id }) => {
      return await Assignment.findById(_id);
    },
    goals: async () => {
      return await Goal.find({});
    },
    goal: async (parent, { goalId: _id }) => {
      return await Goal.findById(_id);
    },
    practicePlans: async () => {
      return await PracticePlan.find({});
    },
    practicePlan: async (parent, { planId: _id }) => {
      return await PracticePlan.findById(_id);
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const teacher = await Teacher.findOne({ email });
      const student = await Student.findOne({ email });

      if (!email) {
        throw new Error("Please enter your email");
      }
      if (!password) {
        throw new Error("Please enter your password");
      }

      const user = teacher || student;
      if (!user) {
        throw new Error("No user with that email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect password!");
      }

      const token = signToken(user);
      if (teacher) {
        return { token, teacher: user };
      }
      if (student) {
        return { token, student, user };
      }
    },

    addTeacher: async (
      _,
      { firstName, lastName, email, password, confirmPassword }
    ) => {
      const teacher = new Teacher({
        firstName,
        lastName,
        email,
        password,
      });
      // validation sent to the front-end
      if (!firstName) {
        throw new Error("First name is required");
      }
      if (!lastName) {
        throw new Error("Last name is required");
      }
      if (!email) {
        throw new Error("email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await teacher.save();
      const token = signToken({ _id: teacher._id }, process.env.SECRET);
      return { token, teacher };
    },

    addStudent: async (parent, { _id, ...args }) => {
      const student = await Student.create({
        ...args,
      });
      await Teacher.findByIdAndUpdate(
        args.teacherId,
        { $addToSet: { students: student._id } },
        { new: true }
      );
      // const token = signToken(student);
      // return { token, student };
    },

    addAssignment: async (parent, { studentId, planId, ...args }) => {
      console.log("studentId in resolver", studentId);
      const assignment = await Assignment.create({
        studentId,
        planId,
        ...args,
      });
      console.log("assignment in resolver", assignment);
      // const student = await Student.findByIdAndUpdate(
      //   studentId,
      //   { $addToSet: { assignments: assignment._id } },
      //   { new: true }
      // );
      const practicePlan = await PracticePlan.findByIdAndUpdate(
        planId,
        { $addToSet: { assignments: assignment._id } },
        { new: true }
      );
      console.log("practice plan in resolver", practicePlan);
      console.log("Practice plan assignments", practicePlan.assignments);
      return assignment;
    },

    addStreak: async (parent, { date, assignmentId, ...args }) => {
      const streak = await Streak.create({
        date,
        ...args,
      });
      await Assignment.findByIdAndUpdate(
        assignmentId,
        { $addToSet: { streaks: streak._id } },
        { new: true }
      );
      return streak;
    },

    addGoal: async (parent, { date, studentId, ...args }) => {
      const goal = await Goal.create({
        date,
        ...args,
      });
      await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { goals: goal._id } },
        { new: true }
      );
      return goal;
    },

    addSkillSheet: async (parent, { teacherId, ...args }) => {
      console.log("teacherId in resolver", teacherId);
      const skillSheet = await SkillSheet.create({
        teacherId,
        ...args,
      });
      console.log("skillSheet in resolver", skillSheet);

      const teacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { $addToSet: { skillSheets: skillSheet._id } },
        { new: true }
      );
      console.log("teacher in resolver", teacher);
      return skillSheet;
    },

    addPracticePlan: async (parent, { studentId, ...args }) => {
      const practicePlan = await PracticePlan.create({
        studentId,
        ...args,
      });

      const student = await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { practicePlans: practicePlan._id } },
        { new: true }
      );
      return practicePlan;
    },

    deleteTeacher: async (parent, { teacherId }) => {
      return await Teacher.findOneAndDelete({ _id: teacherId });
    },

    deleteStudent: async (parent, { studentId }) => {
      return await Student.findOneAndDelete({ _id: studentId });
    },

    deleteAssignment: async (parent, { assignmentId }) => {
      return await Assignment.findOneAndDelete({ _id: assignmentId });
    },

    deleteGoal: async (parent, { goalId }) => {
      return await Goal.findOneAndDelete({ _id: goalId });
    },

    deletePracticePlan: async (parent, { planId }) => {
      return await PracticePlan.findOneAndDelete({ _id: planId });
    },

    deleteSkillSheet: async (parent, { skillSheetId }) => {
      return await SkillSheet.findOneAndDelete({ _id: skillSheetId });
    },

    editTeacher: async (
      parent,
      { teacherId, firstName, lastName, email, password, students }
    ) => {
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        throw new Error("Teacher not found");
      }
      if (firstName) {
        teacher.firstName = firstName;
      }
      if (lastName) {
        teacher.lastName = lastName;
      }
      if (email) {
        teacher.email = email;
      }
      if (password) {
        teacher.password = password;
      }
      if (students) {
        teacher.students = students;
      }
      await teacher.save();
      return teacher;
    },

    editStudent: async (parent, { studentId, ...args }) => {
      const student = await Student.findByIdAndUpdate(studentId);
      console.log("This is student in resolver", student);
      console.log("This is args in resolver", args);
      // do I need to add args to the conditionals?
      if (!student) {
        throw new Error("Student not found");
      }
      if (args.firstName) {
        student.firstName = args.firstName;
      }
      if (args.lastName) {
        student.lastName = args.lastName;
      }
      if (args.email) {
        student.email = args.email;
      }
      if (args.username) {
        student.username = args.username;
      }
      if (args.password) {
        student.password = args.password;
      }
      if (args.primaryContact) {
        student.primaryContact = args.primaryContact;
      }
      if (args.primaryContactEmail) {
        student.primaryContactEmail = args.primaryContactEmail;
      }
      if (args.instrument) {
        student.instrument = args.instrument;
      }
      if (args.lessonDay) {
        student.lessonDay = args.lessonDay;
      }
      if (args.lessonTime) {
        student.lessonTime = args.lessonTime;
      }
      if (args.grade) {
        student.grade = args.grade;
      }
      if (args.school) {
        student.school = args.school;
      }
      if (args.lessonLocation) {
        student.lessonLocation = args.lessonLocation;
      }
      if (args.isActive) {
        student.isActive = args.isActive;
      }
      await student.save();
      return student;
    },
  },
};

module.exports = resolvers;
