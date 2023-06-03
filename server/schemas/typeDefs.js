const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Student {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    primaryContact: String
    primaryContactEmail: String
    instrument: String
    lessonDay: String
    lessonTime: String
    grade: String
    school: String
    lessonLocation: String
    isActive: Boolean
    teacherId: String
  }

  type Query {
    students: [Student]!
    student(studentId: ID!): Student
  }

  type Mutation {
    addStudent(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String!
      primaryContact: String
      primaryContactEmail: String
      instrument: String
      lessonDay: String
      lessonTime: String
      grade: String
      school: String
      lessonLocation: String
      isActive: Boolean
      teacherId: String
    ): Student
    removeStudent(studentId: ID!): Student!
    editStudent(
      studentId: ID!
      firstName: String
      lastName: String
      email: String
      username: String
      password: String
      primaryContact: String
      primaryContactEmail: String
      instrument: String
      lessonDay: String
      lessonTime: String
      grade: String
      school: String
      lessonLocation: String
      isActive: Boolean
      teacherId: String
    ): Student!
  }
`;

module.exports = typeDefs;
