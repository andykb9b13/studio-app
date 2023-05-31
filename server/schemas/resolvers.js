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
        firstName,
        lastName,
        email,
        primaryContact,
        primaryContactEmail,
        instrument,
        school,
        lessonLocation,
        isActive,
      }
    ) => {
      return await Student.create({
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
  },
};

module.exports = resolvers;
