const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

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
    avatarId: Int
    teacherId: String
    totalPlanPoints: Int
    totalCompletedPoints: Int
    totalSheetPoints: Int
    assignments: [Assignment]
    goals: [Goal]
    skillSheets: [SkillSheet]
    practicePlans: [PracticePlan]
    pieces: [Piece]
    posts: [Post]
    comments: [Comment]
    likes: [Like]
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
  }

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
    dateCompleted: Date!
    pieceType: String
    difficulty: String
  }

  type TeacherAuth {
    token: ID!
    teacher: Teacher
  }

  type StudentAuth {
    token: ID!
    student: Student
  }

  union TeacherOrStudent = Teacher | Student

  type Query {
    students(teacherId: ID!): [Student]!
    student(studentId: ID!): Student
    teachers: [Teacher]!
    teacher(teacherId: ID!): Teacher
    assignments: [Assignment]!
    assignment(assignmentId: ID!): Assignment
    goals: [Goal]!
    goal(goalId: ID!): Goal
    practicePlans: [PracticePlan]
    practicePlan(planId: ID!): PracticePlan
    resources: [Resource]
    resource: Resource
    posts(studioId: ID!): [Post]
    post: Post
    comments: [Comment]
    comment: Comment
    likes: [Like]
    like: Like
    author(authorId: ID!, isTeacher: Boolean!): TeacherOrStudent
    pieces: [Piece]
    piece: Piece
  }

  type Mutation {
    teacherLogin(email: String!, password: String!): TeacherAuth

    studentLogin(email: String!, password: String!): StudentAuth

    addTeacher(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      confirmPassword: String!
      avatarId: Int
      aboutInfo: String
      phoneNumber: String
      username: String
    ): TeacherAuth

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

    completeAssignment(assignmentId: ID, completed: Boolean): Assignment

    completeSkillSheet(studentId: ID, skillSheetId: ID): Student

    removeCompletedSkillSheet(studentId: ID, skillSheetId: ID): Student

    addResource(
      teacherId: String
      practicePlanId: String
      resourceName: String
      url: String
      description: String
    ): Resource

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

    addPracticePlan(
      name: String!
      dateCreated: Date
      studentId: String
      planNotes: String
    ): PracticePlan

    addPost(
      studioId: String!
      title: String!
      message: String!
      url: String
      createdAt: Date!
      authorId: ID!
      isTeacher: Boolean!
    ): Post

    addComment(
      authorId: String!
      message: String!
      createdAt: Date!
      isTeacher: Boolean!
      postId: String!
    ): Comment

    addPiece(
      studentId: ID!
      pieceName: String!
      composer: String!
      description: String!
      dateCompleted: Date!
      pieceType: String
      difficulty: String
    ): Piece

    addLike(userId: String, postId: ID, commentId: ID): Like

    deleteAssignment(assignmentId: ID!): Assignment!

    deleteGoal(goalId: ID!): Goal!

    deleteStreak(streakId: ID!): Streak!

    deleteStudent(studentId: ID!): Student!

    deleteTeacher(teacherId: ID!): Teacher!

    deleteSkillSheet(skillSheetId: ID!): SkillSheet!

    deleteResource(resourceId: ID!): Resource!

    deletePracticePlan(planId: ID!): PracticePlan!

    deletePost(postId: ID!): Post!

    deleteComment(commentId: ID!): Comment!

    deleteLike(likeId: ID!): Like!

    deletePiece(pieceId: ID!): Piece!

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
      isActive: Boolean
      teacherId: String
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

    editAssignment(
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

    editPracticePlan(
      planId: ID!
      name: String
      planNotes: String
    ): PracticePlan!

    editPiece(
      pieceId: ID!
      pieceName: String
      description: String
      pieceType: String
      difficulty: String
    ): Piece!
  }
`;

module.exports = typeDefs;
