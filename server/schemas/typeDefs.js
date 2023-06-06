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
    assignments: [Assignment]
    goals: [Goal]
    skillSheets: [SkillSheet]
  }

  type Teacher {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    students: [Student]
  }

  type Assignment {
    _id: ID
    date: String!
    exerciseName: String!
    source: String
    assignmentType: String
    specialNotes: String
    metronome: String
    pages: String
    streaks: [Streak]
  }

  type Streak {
    _id: ID
    date: String!
    assignmentId: String!
    numTries: Int
    numSuccess: Int
    numFail: Int
  }

  type Goal {
    _id: ID
    practiceTime: Int
    practiceDays: Int
    skillSheet: SkillSheet
  }

  type SkillSheet {
    _id: ID
    sheetNumber: Int!
    sheetName: String!
    scales: [String]
    arpeggios: [String]
    articulation: [String]
    slurs: [String]
    longTones: [String]
    exercises: [String]
    etudes: [String]
    pieces: [String]
    completed: Boolean
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
