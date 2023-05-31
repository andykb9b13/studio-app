const { Student } = require("../models");

const resolvers = {
  Query: {
    students: async () => {
      return await Student.find({});
    },
    student: async (parent, { studentId: _id }) => {
      return await Student.findById(studentId);
    },
  },

  Mutation: {
    addStudent: async (
      parent,
      {
        _id,
        firstName,
        lastName,
        email,
        primaryContact,
        primaryContactEmail,
        instrument,
        lessonDay,
        lessonTime,
        grade,
        school,
        lessonLocation,
        isActive,
      }
    ) => {
      return await Student.create({
        _id,
        firstName,
        lastName,
        email,
        primaryContact,
        primaryContactEmail,
        instrument,
        lessonDay,
        lessonTime,
        grade,
        school,
        lessonLocation,
        isActive,
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
        primaryContact,
        primaryContactEmail,
        instrument,
        lessonDay,
        lessonTime,
        grade,
        school,
        lessonLocation,
        isActive,
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

      await student.save();

      return student;
    },
  },
};

module.exports = resolvers;
