const {
  Student,
  Teacher,
  Assignment,
  Goal,
  SkillSheet,
  Streak,
  PracticePlan,
  Resource,
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
          populate: [
            {
              path: "assignments",
              model: "Assignment",
            },
            {
              path: "resources",
              model: "Resource",
            },
          ],
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
        .populate("skillSheets")
        .populate("resources");
    },
    assignments: async () => {
      return await Assignment.find({});
    },
    assignment: async (parent, { assignmentId: _id }) => {
      return await Assignment.findById(_id).populate("resources");
    },
    resources: async () => {
      return await Resource.find({});
    },
    resource: async (parent, { resourceId: _id }) => {
      return await Resource.findById(_id);
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
    teacherLogin: async (parent, { email, password }) => {
      const teacher = await Teacher.findOne({ email });

      if (!email) {
        throw new Error("Please enter your email");
      }
      if (!password) {
        throw new Error("Please enter your password");
      }

      const user = teacher;
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
    },

    studentLogin: async (parent, { email, password }) => {
      const student = await Student.findOne({ email });

      if (!email) {
        throw new Error("Please enter your email");
      }
      if (!password) {
        throw new Error("Please enter your password");
      }

      const user = student;
      if (!user) {
        throw new Error("No user with that email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect password!");
      }

      const token = signToken(user);

      return { token, student: user };
    },

    addTeacher: async (
      parent,
      { firstName, lastName, email, password, confirmPassword }
    ) => {
      const teacher = new Teacher({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
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

    addStudent: async (
      parent,
      {
        _id,
        firstName,
        lastName,
        email,
        password,
        username,
        confirmPassword,
        ...args
      }
    ) => {
      console.log(
        firstName,
        lastName,
        email,
        password,
        username,
        confirmPassword
      );
      if (!firstName) {
        throw new Error("First name is required");
      }
      if (!lastName) {
        throw new Error("Last name is required");
      }
      if (!email) {
        throw new Error("Email is required");
      }
      if (!username) {
        throw new Error("Username is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const student = await Student.create({
        firstName,
        lastName,
        email,
        username,
        password,
        ...args,
      });
      await Teacher.findByIdAndUpdate(
        args.teacherId,
        { $addToSet: { students: student._id } },
        { new: true }
      );
      console.log("here is student in resolver", student);
      // const token = signToken(student);
      return { student };
    },

    addAssignment: async (
      parent,
      { studentId, planId, pointsWorth, resourceUrl, completed, ...args }
    ) => {
      console.log({ ...args });
      const assignment = await Assignment.create({
        studentId,
        planId,
        pointsWorth,
        completed,
        resourceUrl,
        ...args,
      });

      const practicePlan = await PracticePlan.findByIdAndUpdate(
        planId,
        { $addToSet: { assignments: assignment._id } },
        { new: true }
      );
      return assignment;
    },

    completeAssignment: async (parent, { assignmentId, completed }) => {
      const assignment = await Assignment.findByIdAndUpdate(assignmentId, {
        completed: completed,
      });
      console.log(assignment);
      return assignment;
    },

    addResource: async (
      parent,
      { practicePlanId, resourceName, url, description, teacherId }
    ) => {
      console.log(resourceName, url, description, practicePlanId, teacherId);
      const resource = await Resource.create({
        practicePlanId,
        resourceName,
        url,
        description,
        teacherId,
      });
      console.log("resource in resolver", resource);
      const practicePlan = await PracticePlan.findByIdAndUpdate(
        practicePlanId,
        { $addToSet: { resources: resource._id } },
        { new: true }
      );
      const teacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { $addToSet: { resources: resource._id } },
        { new: true }
      );
      return resource;
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

    addSkillSheet: async (
      parent,
      { teacherId, badgeId, difficulty, ...args }
    ) => {
      console.log("teacherId in resolver", teacherId);
      const skillSheet = await SkillSheet.create({
        teacherId,
        badgeId,
        difficulty,
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
      try {
        const deletedStudent = await Student.findOneAndDelete({
          _id: studentId,
        });
        if (!deletedStudent) {
          throw new Error("Student not found");
        }
        for (const practicePlanId of deletedStudent.practicePlans) {
          const deletedPlan = await PracticePlan.findOneAndDelete({
            _id: practicePlanId,
          });
          for (const assignmentId of deletedPlan.assignments) {
            await Assignment.findOneAndDelete({
              _id: assignmentId,
            });
          }
        }
        // for (const assignmentId of deletedStudent.assignments) {
        //   await Assignment.findOneAndDelete({ _id: assignmentId });
        // }

        await Teacher.updateMany(
          { students: studentId },
          { $pull: { students: studentId } }
        );
        return deletedStudent;
      } catch (error) {
        throw new Error("Error deleting student: " + error.message);
      }
    },

    deleteAssignment: async (parent, { assignmentId }) => {
      try {
        const deletedAssignment = await Assignment.findOneAndDelete({
          _id: assignmentId,
        });
        if (!deletedAssignment) {
          throw new Error("Assignment not found");
        }
        const deletedFromPlan = await PracticePlan.updateMany(
          { assignments: assignmentId },
          { $pull: { assignments: assignmentId } }
        );
        console.log("deletedFromPlan", deletedFromPlan);
        console.log("deletedAssignment", deletedAssignment);
        return deletedAssignment;
      } catch (error) {
        throw new Error("Error deleting the assignment: " + error.message);
      }
    },

    deleteResource: async (parent, { resourceId }) => {
      try {
        const deletedResource = await Resource.findOneAndDelete({
          _id: resourceId,
        });
        if (!deletedResource) {
          throw new Error("Resource not found");
        }
        await Teacher.updateMany(
          { resources: resourceId },
          { $pull: { resources: resourceId } }
        );
        await PracticePlan.updateMany(
          { resources: resourceId },
          { $pull: { resources: resourceId } }
        );
        return deletedResource;
      } catch (error) {
        throw new Error("Error deleting the resource: " + error.message);
      }
    },

    deleteGoal: async (parent, { goalId }) => {
      return await Goal.findOneAndDelete({ _id: goalId });
    },

    deletePracticePlan: async (parent, { planId }) => {
      try {
        const deletedPlan = await PracticePlan.findOneAndDelete({
          _id: planId,
        });
        if (!deletedPlan) {
          throw new Error("Practice plan not found");
        }
        await Student.updateMany(
          { practicePlans: planId },
          { $pull: { practicePlans: planId } }
        );
        return deletedPlan;
      } catch (error) {
        throw new Error("Error deleting practice plan: ", +error.message);
      }
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
      if (args.avatarId) {
        student.avatarId = args.avatarId;
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
