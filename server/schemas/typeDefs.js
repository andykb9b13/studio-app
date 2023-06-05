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

  type Teacher {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    students: [Student]
  }

  type Auth {
    token: ID!
    teacher: Teacher
  }

  type Query {
    students: [Student]!
    student(studentId: ID!): Student
    teachers: [Teacher]!
    teacher(teacherId: ID!): Teacher
  }

  type Mutation {
    login(username: String!, password: String!): Auth

    addTeacher(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String!
    ): Teacher

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

    removeTeacher(teacherId: ID!): Teacher!

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

    editTeacher(
      teacherId: ID!
      firstName: String
      lastName: String
      email: String
      username: String
      password: String
    ): Teacher!
  }
`;

module.exports = typeDefs;
