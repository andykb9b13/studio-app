const { Student, Teacher } = require("../models");

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
    // teacher: async (parent, { teacherId: _id }) => {
    //   return await Teacher.findById(_id);
    // },
  },

  Mutation: {
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
      return await Student.create({
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
