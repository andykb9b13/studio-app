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
      return await Teacher.findById(_id).populate("students");
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
    goal: async ([parent, { goalId: _id }]) => {
      return await Goal.findById(_id);
    },
    practicePlan: async ([parent, { planId: _id }]) => {
      return PracticePlan.findById(_id);
    },
    practicePlans: async ([parent, { studentId: _id }]) => {
      return PracticePlan.find({ studentId: _id });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const teacher = await Teacher.findOne({ email });
      const student = await Student.findOne({ email });

      const user = teacher || student;
      if (!user) {
        throw new Error("No user with that email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      if (teacher) {
        return { token, teacher: user };
      }
      if (student) {
        return { token, student, user };
      }
    },

    addTeacher: async (_, { firstName, lastName, email, password }) => {
      const teacher = new Teacher({
        firstName,
        lastName,
        email,
        password,
      });
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
      return Teacher.findOneAndDelete({ _id: teacherId });
    },

    deleteStudent: async (parent, { studentId }) => {
      return Student.findOneAndDelete({ _id: studentId });
    },

    deleteAssignment: async (parent, { assignmentId }) => {
      return Assignment.findOneAndDelete({ _id: assignmentId });
    },

    deleteGoal: async (parent, { goalId }) => {
      return Goal.findONeAndDelete({ _id: goalId });
    },

    deleteSkillSheet: async (parent, { skillSheetId }) => {
      return SkillSheet.findOneAndDelete({ _id: skillSheetId });
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
      // do I need to add args to the conditionals?
      if (!student) {
        throw new Error("Student not found");
      }
      if (firstName) {
        student.firstName = firstName;
      }
      if (lastName) {
        student.lastName = lastName;
      }
      if (email) {
        student.email = email;
      }
      if (username) {
        student.username = username;
      }
      if (password) {
        student.password = password;
      }
      if (primaryContact) {
        student.primaryContact = primaryContact;
      }
      if (primaryContactEmail) {
        student.primaryContactEmail = primaryContactEmail;
      }
      if (instrument) {
        student.instrument = instrument;
      }
      if (lessonDay) {
        student.lessonDay = lessonDay;
      }
      if (lessonTime) {
        student.lessonTime = lessonTime;
      }
      if (grade) {
        student.grade = grade;
      }
      if (school) {
        student.school = school;
      }
      if (lessonLocation) {
        student.lessonLocation = lessonLocation;
      }
      if (isActive) {
        student.isActive = isActive;
      }
      if (teacherId) {
        student.teacherId = teacherId;
      }

      // await student.save();

      return student;
    },
  },
};

module.exports = resolvers;
