const {
  Assignment,
  Comment,
  Goal,
  Like,
  Piece,
  Post,
  PracticePlan,
  Resource,
  SkillSheet,
  Streak,
  Student,
  Teacher,
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
    assignment: async (parent, { assignmentId: _id }) => {
      return await Assignment.findById(_id).populate("resources");
    },
    assignments: async () => {
      return await Assignment.find({});
    },
    author: async (parent, { authorId: _id, isTeacher }) => {
      if (isTeacher) {
        return await Teacher.findById(_id);
      } else {
        return await Student.findById(_id);
      }
    },
    comment: async (parent, { commentId: _id }) => {
      return await Comment.findById(_id);
    },
    comments: async () => {
      return await Comment.find({});
    },
    goal: async (parent, { goalId: _id }) => {
      return await Goal.findById(_id);
    },
    goals: async () => {
      return await Goal.find({});
    },
    like: async (parent, { likeId: _id }) => {
      return await Like.findById(_id);
    },
    likes: async () => {
      return await Like.find({});
    },
    piece: async (parent, { pieceId: _id }) => {
      return await Piece.findById(_id);
    },
    post: async (parent, { postId: _id }) => {
      return await Post.findById(_id);
    },
    posts: async (parent, { studioId: _id }) => {
      try {
        const posts = await Post.find({ studioId: _id })
          .populate("comments")
          .populate("authorId");
        return posts;
      } catch (err) {
        console.error(err);
      }
    },
    practicePlan: async (parent, { planId: _id }) => {
      return await PracticePlan.findById(_id);
    },
    practicePlans: async () => {
      return await PracticePlan.find({});
    },
    resource: async (parent, { resourceId: _id }) => {
      return await Resource.findById(_id);
    },
    resources: async () => {
      return await Resource.find({});
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
        .populate("skillSheets")
        .populate("pieces");
    },
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
    teacher: async (parent, { teacherId: _id }) => {
      return await Teacher.findById(_id)
        .populate("students")
        .populate("skillSheets")
        .populate("resources")
        .populate("pieces")
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
    teachers: async () => {
      return await Teacher.find({})
        .populate("students")
        .populate("skillSheets");
    },
  },

  Mutation: {
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

    addLike: async (parent, { userId, ...args }) => {
      try {
        const like = await Like.create(userId, ...args);
        return like;
      } catch (err) {
        console.error(err);
      }
    },

    addPiece: async (parent, { teacherId, ...args }) => {
      try {
        const piece = await Piece.create({ ...args });

        await Teacher.findByIdAndUpdate(
          teacherId,
          { $addToSet: { pieces: piece._id } },
          { new: true }
        );
        return piece;
      } catch (err) {
        console.error(err);
      }
    },

    addPost: async (parent, { authorId, title, message, ...args }) => {
      console.log("This is the message in the resolver", message);
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

    addResource: async (
      parent,
      {
        practicePlanId,
        resourceName,
        url,
        description,
        resourceType,
        teacherId,
      }
    ) => {
      console.log(
        resourceName,
        url,
        description,
        practicePlanId,
        resourceType,
        teacherId
      );
      const resource = await Resource.create({
        practicePlanId,
        resourceType,
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

    completeAssignment: async (parent, { assignmentId, completed }) => {
      const assignment = await Assignment.findById(assignmentId);
      assignment.completed = completed;
      await assignment.save();
      return assignment;
    },

    completePiece: async (parent, { pieceId, studentId }) => {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { pieces: pieceId } },
        { new: true }
      );
      return updatedStudent;
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

    deleteGoal: async (parent, { goalId }) => {
      return await Goal.findOneAndDelete({ _id: goalId });
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

    editAssignment: async (parent, { assignmentId, ...args }) => {
      console.log("in edit assignment");
      console.log(...args);
      try {
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
          throw new Error("Assignment not found");
        }
        if (args.exerciseName) {
          assignment.exerciseName = args.exerciseName;
        }
        if (args.source) {
          assignment.source = args.source;
        }
        if (args.assignmentType) {
          assignment.assignmentType = args.assignmentType;
        }
        if (args.specialNotes) {
          assignment.specialNotes = args.specialNotes;
        }
        if (args.metronome) {
          assignment.metronome = args.metronome;
        }
        if (args.pages) {
          assignment.pages = args.pages;
        }
        if (args.pointsWorth) {
          assignment.pointsWorth = args.pointsWorth;
        }
        if (args.completed) {
          assignment.completed = args.completed;
        }
        await assignment.save();
        return assignment;
      } catch (err) {
        console.error(err);
      }
    },

    editPracticePlan: async (parent, { planId, ...args }) => {
      try {
        const practicePlan = await PracticePlan.findByIdAndUpdate(
          planId
        ).populate("resources");

        if (!practicePlan) {
          throw new Error("Practice Plan not found");
        }
        if (args.name) {
          practicePlan.name = args.name;
        }
        if (args.planNotes) {
          practicePlan.planNotes = args.planNotes;
        }
        if (args.resourceId) {
          practicePlan.resources = [...practicePlan.resources, args.resourceId];
        }
        await practicePlan.save();
        const editedPlan = practicePlan.populate("resources");
        return editedPlan;
      } catch (err) {
        console.error(err);
      }
    },

    editStudent: async (parent, { studentId, ...args }) => {
      const student = await Student.findByIdAndUpdate(studentId).populate(
        "pieces"
      );

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
      if (args.pieceId) {
        student.pieces = [...student.pieces, args.pieceId];
      }

      await student.save();
      const editedStudent = student.populate("pieces");
      return editedStudent;
    },

    editTeacher: async (
      parent,
      {
        teacherId,
        firstName,
        lastName,
        email,
        password,
        students,
        avatarId,
        aboutInfo,
        phoneNumber,
        username,
      }
    ) => {
      const teacher = await Teacher.findById(teacherId);
      console.log("in edit teacher resolver");

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
      if (avatarId) {
        teacher.avatarId = avatarId;
      }
      if (aboutInfo) {
        teacher.aboutInfo = aboutInfo;
      }
      if (phoneNumber) {
        teacher.phoneNumber = phoneNumber;
      }
      if (username) {
        teacher.username = username;
      }
      await teacher.save();
      return teacher;
    },

    removeCompletedSkillSheet: async (parent, { skillSheetId, studentId }) => {
      const updatedStudent = await Student.findByIdAndUpdate(studentId, {
        $pull: { skillSheets: skillSheetId },
      });
      return updatedStudent;
    },

    removePieceFromStudent: async (parent, { pieceId, studentId }) => {
      const updatedStudent = await Student.findByIdAndUpdate(studentId, {
        $pull: { pieces: pieceId },
      });
      return updatedStudent;
    },

    removeResourceFromPracticePlan: async (parent, { planId, resourceId }) => {
      try {
        const practicePlan = await PracticePlan.findByIdAndUpdate(planId, {
          $pull: { resources: resourceId },
        });
        practicePlan.save();
        return practicePlan;
      } catch (err) {
        console.error(err);
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
  },
};

module.exports = resolvers;
