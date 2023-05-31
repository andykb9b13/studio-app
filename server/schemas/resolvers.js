const { Student } = require("../models");

const resolvers = {
  Query: {
    students: async () => {
      return await Student.find({});
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
  },
};

module.exports = resolvers;
