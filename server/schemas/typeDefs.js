const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Assignment {
    _id: ID
    exerciseName: String
    studentId: String
    planId: String
    source: String
    assignmentType: String
    specialNotes: String
    metronome: String
    pages: String
    pointsWorth: Int
    completed: Boolean
    streaks: [Streak]
  }

  type Comment {
    _id: ID
    authorId: String!
    message: String!
    createdAt: Date!
    isTeacher: Boolean!
    likes: Int
    postId: String!
    comments: [Comment]
  }

  type Goal {
    _id: ID
    practiceTime: Int
    practiceDays: Int
    skillSheet: SkillSheet
  }

  type Like {
    _id: ID
    authorID: String!
    postId: String
    commentId: String
  }

  type Piece {
    _id: ID
    pieceName: String!
    composer: String!
    description: String!
    pieceType: String
    difficulty: String
    url: String
  }

  type Post {
    studioId: String!
    _id: ID
    title: String!
    message: String!
    url: String
    createdAt: Date!
    authorId: Teacher
    isTeacher: Boolean!
    likes: Int
    comments: [Comment]
  }

  type PracticePlan {
    _id: ID
    name: String!
    dateCreated: Date
    studentId: String
    planNotes: String
    assignments: [Assignment]
    goals: [Goal]
    skillSheets: [SkillSheet]
    resources: [Resource]
  }

  type Resource {
    _id: ID
    teacherId: String
    practicePlanId: String
    resourceName: String
    url: String
    description: String
    resourceType: String
  }

  type SkillSheet {
    _id: ID
    sheetName: String!
    teacherId: String
    description: String
    url: String
    scales: String
    exercises: String
    etudes: String
    pieces: String
    sheetPoints: Int
    badgeId: Int
    difficulty: String
    completed: Boolean
  }

  type Streak {
    _id: ID
    assignmentId: String
    blunders: Int!
    date: Date!
    exerciseName: String!
    mostInARow: Int
    studentId: String!
    successes: Int!
    successPercentage: Float
    tempo: Int
    totalTries: Int!
  }

  type Student {
    _id: ID
    assignments: [Assignment]
    avatarId: Int
    comments: [Comment]
    email: String
    goals: [Goal]
    grade: String
    instrument: String
    isActive: Boolean
    firstName: String
    lastName: String
    lessonDay: String
    lessonLocation: String
    lessonTime: String
    likes: [Like]
    password: String
    pieces: [Piece]
    posts: [Post]
    practicePlans: [PracticePlan]
    primaryContact: String
    primaryContactEmail: String
    school: String
    skillSheets: [SkillSheet]
    streaks: [Streak]
    teacherId: String
    totalCompletedPoints: Int
    totalPlanPoints: Int
    totalSheetPoints: Int
    username: String
  }

  type StudentAuth {
    token: ID!
    student: Student
  }

  type Teacher {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    avatarId: Int
    aboutInfo: String
    phoneNumber: String
    username: String
    students: [Student]
    skillSheets: [SkillSheet]
    resources: [Resource]
    posts: [Post]
    comments: [Comment]
    likes: [Like]
    resourceTypes: [String]
    pieces: [Piece]
  }

  type TeacherAuth {
    token: ID!
    teacher: Teacher
  }

  union TeacherOrStudent = Teacher | Student

  type Query {
    assignments: [Assignment]!
    assignment(assignmentId: ID!): Assignment
    author(authorId: ID!, isTeacher: Boolean!): TeacherOrStudent
    comments: [Comment]
    comment: Comment
    goals: [Goal]!
    goal(goalId: ID!): Goal
    likes: [Like]
    like: Like
    pieces: [Piece]
    piece: Piece
    posts(studioId: ID!): [Post]
    post: Post
    practicePlans: [PracticePlan]
    practicePlan(planId: ID!): PracticePlan
    resources: [Resource]
    resource: Resource
    streaks(studentId: ID!): [Streak]
    students(teacherId: ID!): [Student]!
    student(studentId: ID!): Student
    teachers: [Teacher]!
    teacher(teacherId: ID!): Teacher
  }

  type Mutation {
    addAssignment(
      exerciseName: String
      studentId: String
      planId: String
      source: String
      assignmentType: String
      specialNotes: String
      metronome: String
      pointsWorth: Int
      completed: Boolean
      pages: String
    ): Assignment

    addComment(
      authorId: String!
      message: String!
      createdAt: Date!
      isTeacher: Boolean!
      postId: String!
    ): Comment

    addGoal(practiceTime: Int, practiceDays: Int): Goal

    addLike(userId: String, postId: ID, commentId: ID): Like

    addPiece(
      teacherId: ID!
      pieceName: String!
      composer: String!
      description: String!
      pieceType: String
      difficulty: String
      url: String
    ): Piece

    addPost(
      studioId: String!
      title: String!
      message: String!
      url: String
      createdAt: Date!
      authorId: ID!
      isTeacher: Boolean!
    ): Post

    addPracticePlan(
      name: String!
      dateCreated: Date
      studentId: String
      planNotes: String
    ): PracticePlan

    addResource(
      teacherId: String
      practicePlanId: String
      resourceName: String
      url: String
      description: String
      resourceType: String
    ): Resource

    addSkillSheet(
      sheetName: String!
      teacherId: String
      description: String
      url: String
      scales: String
      exercises: String
      etudes: String
      pieces: String
      sheetPoints: Int
      badgeId: Int
      difficulty: String
      completed: Boolean
    ): SkillSheet

    addStreak(
      assignmentId: String
      blunders: Int!
      date: Date!
      exerciseName: String!
      mostInARow: Int
      studentId: String!
      successes: Int!
      successPercentage: Float
      tempo: Int
      totalTries: Int!
    ): Streak

    addStudent(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String!
      confirmPassword: String!
      primaryContact: String
      primaryContactEmail: String
      instrument: String
      lessonDay: String
      lessonTime: String
      grade: String
      school: String
      lessonLocation: String
      avatarId: Int
      isActive: Boolean
      teacherId: String
    ): Student

    addTeacher(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): TeacherAuth

    completeAssignment(assignmentId: ID, completed: Boolean): Assignment

    completePiece(studentId: ID, pieceId: ID): Student

    completeSkillSheet(studentId: ID, skillSheetId: ID): Student

    deleteAssignment(assignmentId: ID!): Assignment!

    deleteComment(commentId: ID!): Comment!

    deleteGoal(goalId: ID!): Goal!

    deleteLike(likeId: ID!): Like!

    deletePiece(pieceId: ID!): Piece!

    deletePost(postId: ID!): Post!

    deletePracticePlan(planId: ID!): PracticePlan!

    deleteResource(resourceId: ID!): Resource!

    deleteSkillSheet(skillSheetId: ID!): SkillSheet!

    deleteStreak(assignmentId: ID, studentId: ID!, streakId: ID!): Streak!

    deleteStudent(studentId: ID!): Student!

    deleteTeacher(teacherId: ID!): Teacher!

    editAssignment(
      assignmentId: ID
      exerciseName: String
      studentId: String
      planId: String
      source: String
      assignmentType: String
      specialNotes: String
      metronome: String
      pages: String
      pointsWorth: Int
      completed: Boolean
    ): Assignment!

    editGoal(goalId: ID!, practiceTime: Int, practiceDays: Int): Goal!

    editPiece(
      pieceId: ID!
      pieceName: String
      description: String
      pieceType: String
      difficulty: String
    ): Piece!

    editPracticePlan(
      planId: ID!
      name: String
      planNotes: String
      resourceId: ID
    ): PracticePlan!

    editSkillSheet(
      skillSheetId: ID!
      sheetName: String
      teacherId: String
      description: String
      url: String
      scales: String
      exercises: String
      etudes: String
      pieces: String
      sheetPoints: Int
      badgeId: Int
      difficulty: String
      completed: Boolean
    ): SkillSheet!

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
      avatarId: Int
      isActive: String
      teacherId: String
      pieceId: ID
    ): Student!

    editTeacher(
      teacherId: ID!
      firstName: String
      lastName: String
      email: String
      password: String
      avatarId: Int
      aboutInfo: String
      phoneNumber: String
      username: String
    ): Teacher!

    removeCompletedSkillSheet(studentId: ID, skillSheetId: ID): Student

    removePieceFromStudent(studentId: ID, pieceId: ID): Student

    removeResourceFromPracticePlan(planId: ID!, resourceId: ID!): PracticePlan!

    studentLogin(email: String!, password: String!): StudentAuth

    teacherLogin(email: String!, password: String!): TeacherAuth
  }
`;

module.exports = typeDefs;
