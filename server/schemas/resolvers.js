const {
  Student,
  Teacher,
  Assignment,
  Goal,
  SkillSheet,
  Streak,
  PracticePlan,
  Resource,
  Like,
  Post,
  Comment,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { findById } = require("../models/Student");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Custom Date scalar type",
    serialize(value) {
      return new Date(value).toISOString(); // Convert Date to ISO string
    },
    parseValue(value) {
      return new Date(value); // Parse ISO string to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // Parse string literal to Date
      }
      return null;
    },
  }),

  TeacherOrStudent: {
    __resolveType(obj) {
      if (obj.isTeacher) {
        return "Teacher";
      } else {
        return "Student";
      }
    },
  },

  Query: {
    students: async (parent, { teacherId: _id }) => {
      const teacher = await Teacher.findById(_id).populate("students");

      const studentArr = [];

      for (const student of teacher.students) {
        const updatedStudent = Student.findById(student._id)
          .populate("skillSheets")
          .populate({
            path: "practicePlans",
            populate: [
              {
                path: "assignments",
                model: "Assignment",
              },
            ],
          });
        studentArr.push(updatedStudent);
      }

      return studentArr;
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
        .populate("assignments")
        .populate("skillSheets");
    },
    teachers: async () => {
      return await Teacher.find({})
        .populate("students")
        .populate("skillSheets");
    },
    teacher: async (parent, { teacherId: _id }) => {
      console.log("In teacher resolver");
      return await Teacher.findById(_id)
        .populate("students")
        .populate("skillSheets")
        .populate("resources")
        .populate({
          path: "posts",
          populate: [
            {
              path: "comments",
              model: "Comment",
            },
          ],
        });
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
    posts: async (parent, { studioId: _id }) => {
      console.log("in posts resolver");
      try {
        const posts = await Post.find({ studioId: _id })
          .populate("comments")
          .populate("authorId");
        console.log("posts in resolver", posts);
        return posts;
      } catch (err) {
        console.error(err);
      }
    },
    post: async (parent, { postId: _id }) => {
      return await Post.findById(_id);
    },
    comments: async () => {
      return await Comment.find({});
    },
    comment: async (parent, { commentId: _id }) => {
      return await Comment.findById(_id);
    },
    likes: async () => {
      return await Like.find({});
    },
    like: async (parent, { likeId: _id }) => {
      return await Like.findById(_id);
    },
    author: async (parent, { authorId: _id, isTeacher }) => {
      if (isTeacher) {
        return await Teacher.findById(_id);
      } else {
        return await Student.findById(_id);
      }
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
      await PracticePlan.findByIdAndUpdate(
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

    completeSkillSheet: async (parent, { skillSheetId, studentId }) => {
      console.log("In complete SkillSheet");

      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { skillSheets: skillSheetId } },
        { new: true }
      );
      return updatedStudent;
    },

    removeCompletedSkillSheet: async (parent, { skillSheetId, studentId }) => {
      const updatedStudent = await Student.findByIdAndUpdate(studentId, {
        $pull: { skillSheets: skillSheetId },
      });
      return updatedStudent;
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
      await PracticePlan.findByIdAndUpdate(
        practicePlanId,
        { $addToSet: { resources: resource._id } },
        { new: true }
      );
      await Teacher.findByIdAndUpdate(
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
      { teacherId, badgeId, difficulty, sheetPoints, ...args }
    ) => {
      const skillSheet = await SkillSheet.create({
        teacherId,
        sheetPoints,
        badgeId,
        difficulty,
        ...args,
      });
      await Teacher.findByIdAndUpdate(
        teacherId,
        { $addToSet: { skillSheets: skillSheet._id } },
        { new: true }
      );
      return skillSheet;
    },

    addPracticePlan: async (parent, { studentId, ...args }) => {
      const practicePlan = await PracticePlan.create({
        studentId,
        ...args,
      });
      await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { practicePlans: practicePlan._id } },
        { new: true }
      );
      return practicePlan;
    },

    addPost: async (parent, { authorId, title, message, ...args }) => {
      if (!title) {
        throw new Error("Title is required");
      }
      if (!message) {
        throw new Error("Message is required");
      }
      try {
        const post = await Post.create({
          authorId,
          title,
          message,
          ...args,
        });
        if (post.isTeacher) {
          await Teacher.findByIdAndUpdate(authorId, {
            $addToSet: { posts: post._id },
          });
        } else {
          await Student.findByIdAndUpdate(authorId, {
            $addToSet: { posts: post._id },
          });
        }
        return post;
      } catch (err) {
        console.error(err);
      }
    },

    addComment: async (parent, { postId, authorId, message, ...args }) => {
      if (!message) {
        throw new Error("Message is required");
      }
      try {
        const comment = await Comment.create({
          authorId,
          message,
          postId,
          ...args,
        });

        await Post.findByIdAndUpdate(postId, {
          $addToSet: { comments: comment._id },
        });
        if (comment.isTeacher) {
          await Teacher.findByIdAndUpdate(authorId, {
            $addToSet: { comments: comment._id },
          });
        } else {
          await Student.findByIdAndUpdate(authorId, {
            $addToSet: { comments: comment._id },
          });
        }
        return comment;
      } catch (err) {
        console.error(err);
      }
    },

    addLike: async (parent, { userId, ...args }) => {
      try {
        const like = await Like.create(userId, ...args);
      } catch (err) {
        console.error(err);
      }
    },

    deleteTeacher: async (parent, { teacherId }) => {
      try {
        const deletedTeacher = await Teacher.findOneAndDelete({
          _id: teacherId,
        });
        if (!deletedTeacher) {
          throw new Error("Teacher not found");
        }
        for (const studentId of deletedTeacher.students) {
          await resolvers.Mutation.deleteStudent(null, { studentId });
        }
        for (const skillSheetId of deletedTeacher.skillSheets) {
          await SkillSheet.findOneAndDelete({
            _id: skillSheetId,
          });
        }
        for (const resourceId of deletedTeacher.resources) {
          await Resource.findOneAndDelete({
            _id: resourceId,
          });
        }
        return deletedTeacher;
      } catch (error) {
        throw new Error("Error deleting teacher: " + error.message);
      }
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
        throw new Error("Error deleting practice plan: " + error.message);
      }
    },

    deleteSkillSheet: async (parent, { skillSheetId }) => {
      try {
        const deletedSkillSheet = await SkillSheet.findOneAndDelete({
          _id: skillSheetId,
        });
        if (!deletedSkillSheet) {
          throw new Error("Skill Sheet not found");
        }
        await Student.updateMany(
          { skillSheets: skillSheetId },
          { $pull: { skillSheets: skillSheetId } }
        );
        await Teacher.updateMany(
          { skillSheets: skillSheetId },
          { $pull: { skillSheets: skillSheetId } }
        );
        await Student.updateMany(
          { skillSheets: skillSheetId },
          { $pull: { skillSheets: skillSheetId } }
        );
        return deletedSkillSheet;
      } catch (error) {
        throw new Error("Error deleting Skill Sheet: " + error.message);
      }
    },

    deletePost: async (parent, { postId }) => {
      try {
        const deletedPost = await Post.findOneAndDelete({
          _id: postId,
        });
        if (!deletedPost) {
          throw new Error("Post not found");
        }
        if (deletedPost.isTeacher) {
          const teacher = await Teacher.updateMany(
            { posts: postId },
            { $pull: { posts: postId } }
          );
          if (deletedPost.comments.length > 0) {
            for (const comment of deletedPost.comments) {
              await Comment.findOneAndDelete({ _id: comment._id });
            }
          }
        } else {
          const student = await Student.updateMany(
            { posts: postId },
            { $pull: { posts: postId } }
          );
          if (deletedPost.comments.length > 0) {
            for (const comment of deletedPost.comments) {
              await Comment.findOneAndDelete({ _id: comment._id });
            }
          }
        }

        return deletedPost;
      } catch (err) {
        console.error(err);
      }
    },

    deleteComment: async (parent, { commentId }) => {
      try {
        const deletedComment = await Comment.findOneAndDelete({
          _id: commentId,
        });
        if (!deletedComment) {
          throw new Error("Comment not found");
        }
        if (deletedComment.isTeacher === true) {
          await Teacher.updateMany(
            { comments: commentId },
            { $pull: { comments: commentId } }
          );
        } else {
          await Student.updateMany(
            { comments: commentId },
            { $pull: { comments: commentId } }
          );
        }
        return deletedComment;
      } catch (err) {
        console.error(err);
      }
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
