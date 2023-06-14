const {
  Student,
  Teacher,
  Assignment,
  Goal,
  SkillSheet,
  Streak,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    students: async () => {
      return await Student.find({}).populate("assignments");
    },
    student: async (parent, { studentId: _id }) => {
      return await Student.findById(_id).populate("assignments");
    },
    teachers: async () => {
      return await Teacher.find({}).populate("students");
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
    // me: async (parent, args, context) => {
    //   if (context.teacher) {
    //     return Teacher.findOne({ _id: context.teacher._id }).populate(
    //       "students"
    //     );
    //   }
    //   throw new AuthenticationError("You are not logged in.");
    // },
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
      const token = signToken(student);
      return { token, student };
    },

    addAssignment: async (parent, { studentId, ...args }) => {
      console.log("studentId in resolver", studentId);
      const assignment = await Assignment.create({
        studentId,
        ...args,
      });
      console.log("assignment in resolver", assignment);
      const student = await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { assignments: assignment._id } },
        { new: true }
      );
      console.log("student in resolver", student);
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

    addSkillSheet: async (parent, { ...args }) => {
      const skillSheet = await SkillSheet.create({
        ...args,
      });
      return skillSheet;
    },

    removeTeacher: async (parent, { teacherId }) => {
      return Teacher.findOneAndDelete({ _id: teacherId });
    },

    removeStudent: async (parent, { studentId }) => {
      return Student.findOneAndDelete({ _id: studentId });
    },

    removeAssignment: async (parent, { assignmentId }) => {
      return Assignment.findOneAndDelete({ _id: assignmentId });
    },

    removeGoal: async (parent, { goalId }) => {
      return Goal.findONeAndDelete({ _id: goalId });
    },

    removeSkillSheet: async (parent, { skillSheetId }) => {
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
      const student = await Student.findById(studentId);
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

      await student.save();

      return student;
    },
  },
};

module.exports = resolvers;
