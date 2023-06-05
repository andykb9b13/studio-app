const { Student, Teacher } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    students: async () => {
      return await Student.find({});
    },
    student: async (parent, { studentId: _id }) => {
      return await Student.findById(_id);
    },
    teachers: async () => {
      return await Teacher.find({}).populate("students");
    },
    teacher: async (parent, { teacherId: _id }) => {
      return await Teacher.findById(_id);
    },
  },

  Mutation: {
    addTeacher: async (
      _,
      { firstName, lastName, email, username, password }
    ) => {
      const teacher = new Teacher({
        firstName,
        lastName,
        username,
        email,
        password,
      });
      await teacher.save();
      const token = signToken({ _id: teacher._id }, process.env.SECRET);
      return { token, teacher };
    },

    login: async (parent, { username, password }) => {
      const teacher = await Teacher.findOne({ username });
      const student = await Student.findOne({ username });

      const user = teacher || student;
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AuthenticationError("Invalid username or password");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, teacher: user };
    },

    addStudent: async (
      parent,
      {
        _id,
        firstName,
        lastName,
        email,
        username,
        password,
        primaryContact,
        primaryContactEmail,
        instrument,
        lessonDay,
        lessonTime,
        grade,
        school,
        lessonLocation,
        isActive,
        teacherId,
      }
    ) => {
      const student = await Student.create({
        _id,
        firstName,
        lastName,
        email,
        username,
        password,
        primaryContact,
        primaryContactEmail,
        instrument,
        lessonDay,
        lessonTime,
        grade,
        school,
        lessonLocation,
        isActive,
        teacherId,
      });
      await Teacher.findByIdAndUpdate(
        teacherId,
        { $addToSet: { students: student._id } },
        { new: true }
      );
      const token = signToken(student);
      return { token, student };
    },
    removeStudent: async (parent, { studentId }) => {
      return Student.findOneAndDelete({ _id: studentId });
    },
    editStudent: async (
      parent,
      {
        studentId,
        firstName,
        lastName,
        email,
        username,
        password,
        primaryContact,
        primaryContactEmail,
        instrument,
        lessonDay,
        lessonTime,
        grade,
        school,
        lessonLocation,
        isActive,
        teacherId,
      }
    ) => {
      const student = await Student.findById(studentId);

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
        student.userName = userName;
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
