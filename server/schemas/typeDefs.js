const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Student {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    username: String
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
    practicePlans: [PracticePlan]
  }

  type Teacher {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    students: [Student]
    skillSheets: [SkillSheet]
  }

  type Assignment {
    _id: ID
    date: String
    exerciseName: String
    studentId: String
    planId: String
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
    sheetName: String!
    teacherId: String
    scales: String
    arpeggios: String
    articulation: String
    slurs: String
    longTones: String
    exercises: String
    etudes: String
    pieces: String
    completed: Boolean
  }

  type PracticePlan {
    _id: ID
    name: String!
    studentId: String
    assignments: [Assignment]
    goals: [Goal]
    skillSheets: [SkillSheet]
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
    assignments: [Assignment]!
    assignment(assignmentId: ID!): Assignment
    goals: [Goal]!
    goal(goalId: ID!): Goal
    practicePlans: [PracticePlan]
    practicePlan(planId: ID!): PracticePlan
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addTeacher(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

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

    addAssignment(
      date: String
      exerciseName: String
      studentId: String
      planId: String
      source: String
      assignmentType: String
      specialNotes: String
      metronome: String
      pages: String
    ): Assignment

    addStreak(
      date: String
      assignmentId: String
      numTries: Int
      numSuccess: Int
      numFail: Int
    ): Streak

    addGoal(practiceTime: Int, practiceDays: Int): Goal

    addSkillSheet(
      sheetName: String!
      teacherId: String
      scales: String
      arpeggios: String
      articulation: String
      slurs: String
      longTones: String
      exercises: String
      etudes: String
      pieces: String
      completed: Boolean
    ): SkillSheet

    addPracticePlan(name: String!, studentId: String): PracticePlan

    deleteAssignment(assignmentId: ID!): Assignment!

    deleteGoal(goalId: ID!): Goal!

    deleteStreak(streakId: ID!): Streak!

    deleteStudent(studentId: ID!): Student!

    deleteTeacher(teacherId: ID!): Teacher!

    deleteSkillSheet(skillSheetId: ID!): SkillSheet!

    deletePracticePlan(planId: ID!): PracticePlan!

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
      password: String
    ): Teacher!

    editAssignment(
      assignmentId: ID!
      date: String
      exerciseName: String
      studentId: String
      source: String
      assignmentType: String
      specialNotes: String
      metronome: String
      pages: String
    ): Assignment!

    editGoal(goalId: ID!, practiceTime: Int, practiceDays: Int): Goal!

    editSkillSheet(
      skillSheetId: ID!
      sheetName: String
      scales: String
      arpeggios: String
      articulation: String
      slurs: String
      longTones: String
      exercises: String
      etudes: String
      pieces: String
      completed: Boolean
    ): SkillSheet!
  }
`;

module.exports = typeDefs;
