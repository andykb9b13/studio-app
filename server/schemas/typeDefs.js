const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Student {
    _id: ID
    firstName: String!
    lastName: String!
    email: String
    primaryContact: String
    primaryContactEmail: String!
    instrument: String!
    lessonDay: String
    lessonTime: String
    grade: String
    school: String
    lessonLocation: String
    isActive: Boolean
  }

  type Query {
    students: [Student]!
    student(studentID: ID!): Student
  }

  type Mutation {
    addStudent(
      firstName: String!
      lastName: String!
      email: String
      primaryContact: String!
      primaryContactEmail: String!
      instrument: String!
      lessonDay: String
      lessonTime: String
      grade: String
      school: String
      lessonLocation: String
      isActive: Boolean
    ): Student
    removeStudent(studentId: ID!): Student
  }
`;

module.exports = typeDefs;
