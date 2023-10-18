import { gql } from "@apollo/client";

// Mutations are in alphabetical order
export const ADD_ASSIGNMENT = gql`
  mutation addAssignment(
    $exerciseName: String!
    $studentId: String
    $planId: String
    $source: String
    $assignmentType: String
    $specialNotes: String
    $metronome: String
    $pointsWorth: Int
    $completed: Boolean
    $pages: String
  ) {
    addAssignment(
      exerciseName: $exerciseName
      studentId: $studentId
      planId: $planId
      source: $source
      assignmentType: $assignmentType
      specialNotes: $specialNotes
      metronome: $metronome
      pointsWorth: $pointsWorth
      completed: $completed
      pages: $pages
    ) {
      exerciseName
      studentId
      planId
      source
      assignmentType
      specialNotes
      metronome
      pointsWorth
      completed
      pages
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $authorId: String!
    $message: String!
    $createdAt: Date!
    $isTeacher: Boolean!
    $postId: String!
  ) {
    addComment(
      authorId: $authorId
      message: $message
      createdAt: $createdAt
      isTeacher: $isTeacher
      postId: $postId
    ) {
      authorId
      message
      createdAt
      isTeacher
      postId
    }
  }
`;

export const ADD_PIECE = gql`
  mutation addPiece(
    $teacherId: ID!
    $pieceName: String!
    $composer: String!
    $description: String!
    $pieceType: String
    $difficulty: String
  ) {
    addPiece(
      teacherId: $teacherId
      pieceName: $pieceName
      composer: $composer
      description: $description
      pieceType: $pieceType
      difficulty: $difficulty
    ) {
      pieceName
      composer
      description
      pieceType
      difficulty
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $studioId: String!
    $title: String!
    $message: String!
    $url: String
    $createdAt: Date!
    $authorId: ID!
    $isTeacher: Boolean!
  ) {
    addPost(
      studioId: $studioId
      title: $title
      message: $message
      url: $url
      createdAt: $createdAt
      authorId: $authorId
      isTeacher: $isTeacher
    ) {
      _id
      studioId
      title
      message
      url
      createdAt
      authorId {
        _id
        firstName
        lastName
      }
      isTeacher
    }
  }
`;

export const ADD_PRACTICEPLAN = gql`
  mutation addPracticePlan(
    $name: String!
    $dateCreated: Date
    $studentId: String
    $planNotes: String
  ) {
    addPracticePlan(
      name: $name
      dateCreated: $dateCreated
      studentId: $studentId
      planNotes: $planNotes
    ) {
      _id
      name
      dateCreated
      studentId
      planNotes
    }
  }
`;

export const ADD_RESOURCE = gql`
  mutation addResource(
    $teacherId: String
    $practicePlanId: String
    $resourceName: String
    $url: String
    $description: String
    $resourceType: String
  ) {
    addResource(
      teacherId: $teacherId
      practicePlanId: $practicePlanId
      resourceName: $resourceName
      url: $url
      description: $description
      resourceType: $resourceType
    ) {
      _id
      teacherId
      practicePlanId
      resourceName
      url
      description
      resourceType
    }
  }
`;

export const ADD_SKILLSHEET = gql`
  mutation addSkillSheet(
    $sheetName: String!
    $teacherId: String
    $description: String
    $url: String
    $scales: String
    $exercises: String
    $etudes: String
    $pieces: String
    $sheetPoints: Int
    $badgeId: Int
    $difficulty: String
  ) {
    addSkillSheet(
      sheetName: $sheetName
      teacherId: $teacherId
      description: $description
      url: $url
      scales: $scales
      exercises: $exercises
      etudes: $etudes
      pieces: $pieces
      sheetPoints: $sheetPoints
      badgeId: $badgeId
      difficulty: $difficulty
    ) {
      sheetName
      teacherId
      description
      url
      scales
      exercises
      etudes
      pieces
      sheetPoints
      badgeId
      difficulty
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
    $primaryContact: String
    $primaryContactEmail: String
    $instrument: String
    $lessonDay: String
    $lessonTime: String
    $grade: String
    $school: String
    $lessonLocation: String
    $teacherId: String
    $avatarId: Int
  ) {
    addStudent(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
      primaryContact: $primaryContact
      primaryContactEmail: $primaryContactEmail
      instrument: $instrument
      lessonDay: $lessonDay
      lessonTime: $lessonTime
      grade: $grade
      school: $school
      lessonLocation: $lessonLocation
      teacherId: $teacherId
      avatarId: $avatarId
    ) {
      _id
      email
      firstName
      grade
      instrument
      isActive
      lastName
      lessonDay
      lessonLocation
      lessonTime
      password
      primaryContact
      primaryContactEmail
      school
      teacherId
      avatarId
      username
    }
  }
`;

export const ADD_TEACHER = gql`
  mutation addTeacher(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $avatarId: Int
    $aboutInfo: String
    $phoneNumber: String
    $username: String
  ) {
    addTeacher(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      avatarId: $avatarId
      aboutInfo: $aboutInfo
      phoneNumber: $phoneNumber
      username: $username
    ) {
      token
      teacher {
        _id
        firstName
        lastName
        email
        avatarId
        aboutInfo
        phoneNumber
        username
      }
    }
  }
`;

export const COMPLETE_ASSIGNMENT = gql`
  mutation completeAssignment($assignmentId: ID!, $completed: Boolean) {
    completeAssignment(assignmentId: $assignmentId, completed: $completed) {
      exerciseName
      studentId
      planId
      source
      assignmentType
      specialNotes
      metronome
      pages
      pointsWorth
      completed
    }
  }
`;

export const COMPLETE_PIECE = gql`
  mutation completePiece($studentId: ID, $pieceId: ID) {
    completePiece(studentId: $studentId, pieceId: $pieceId) {
      _id
    }
  }
`;

export const COMPLETE_SKILLSHEET = gql`
  mutation completeSkillSheet($studentId: ID, $skillSheetId: ID) {
    completeSkillSheet(studentId: $studentId, skillSheetId: $skillSheetId) {
      _id
    }
  }
`;

export const DELETE_TEACHER = gql`
  mutation deleteTeacher($teacherId: ID!) {
    deleteTeacher(teacherId: $teacherId) {
      _id
      firstName
      lastName
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($studentId: ID!) {
    deleteStudent(studentId: $studentId) {
      _id
      firstName
      lastName
    }
  }
`;

export const DELETE_PRACTICE_PLAN = gql`
  mutation deletePracticePlan($planId: ID!) {
    deletePracticePlan(planId: $planId) {
      _id
    }
  }
`;

export const DELETE_ASSIGNMENT = gql`
  mutation deleteAssignment($assignmentId: ID!) {
    deleteAssignment(assignmentId: $assignmentId) {
      _id
    }
  }
`;

export const DELETE_SKILLSHEET = gql`
  mutation deleteSkillSheet($skillSheetId: ID!) {
    deleteSkillSheet(skillSheetId: $skillSheetId) {
      _id
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation deleteResource($resourceId: ID!) {
    deleteResource(resourceId: $resourceId) {
      _id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const DELETE_PIECE = gql`
  mutation deletePiece($pieceId: ID!) {
    deletePiece(pieceId: $pieceId) {
      _id
    }
  }
`;

export const EDIT_ASSIGNMENT = gql`
  mutation editAssignment(
    $assignmentId: ID!
    $exerciseName: String
    $source: String
    $assignmentType: String
    $specialNotes: String
    $metronome: String
    $pages: String
    $pointsWorth: Int
    $completed: Boolean
  ) {
    editAssignment(
      assignmentId: $assignmentId
      exerciseName: $exerciseName
      source: $source
      assignmentType: $assignmentType
      specialNotes: $specialNotes
      metronome: $metronome
      pages: $pages
      pointsWorth: $pointsWorth
      completed: $completed
    ) {
      exerciseName
      studentId
      planId
      source
      assignmentType
      specialNotes
      metronome
      pages
      pointsWorth
      completed
    }
  }
`;

export const EDIT_PRACTICE_PLAN = gql`
  mutation editPracticePlan(
    $planId: ID!
    $name: String
    $planNotes: String
    $resourceId: ID
  ) {
    editPracticePlan(
      planId: $planId
      name: $name
      planNotes: $planNotes
      resourceId: $resourceId
    ) {
      name
      planNotes
      dateCreated
      studentId
      resources {
        _id
        resourceName
        resourceType
        url
        description
      }
    }
  }
`;

export const EDIT_STUDENT = gql`
  mutation editStudent(
    $studentId: ID!
    $firstName: String
    $lastName: String
    $email: String
    $username: String
    $password: String
    $primaryContact: String
    $primaryContactEmail: String
    $instrument: String
    $lessonDay: String
    $lessonTime: String
    $grade: String
    $school: String
    $lessonLocation: String
    $teacherId: String
    $avatarId: Int
    $isActive: Boolean
    $pieceId: ID
  ) {
    editStudent(
      studentId: $studentId
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      primaryContact: $primaryContact
      primaryContactEmail: $primaryContactEmail
      instrument: $instrument
      lessonDay: $lessonDay
      lessonTime: $lessonTime
      grade: $grade
      school: $school
      lessonLocation: $lessonLocation
      teacherId: $teacherId
      avatarId: $avatarId
      isActive: $isActive
      pieceId: $pieceId
    ) {
      _id
      email
      firstName
      grade
      instrument
      isActive
      lastName
      lessonDay
      lessonLocation
      lessonTime
      password
      primaryContact
      primaryContactEmail
      school
      teacherId
      username
      avatarId
    }
  }
`;

export const EDIT_TEACHER = gql`
  mutation Mutation(
    $teacherId: ID!
    $username: String
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $avatarId: Int
    $aboutInfo: String
    $phoneNumber: String
  ) {
    editTeacher(
      teacherId: $teacherId
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      avatarId: $avatarId
      aboutInfo: $aboutInfo
      phoneNumber: $phoneNumber
    ) {
      aboutInfo
      avatarId
      email
      firstName
      lastName
      password
      phoneNumber
      username
    }
  }
`;

export const REMOVE_COMPLETED_SKILLSHEET = gql`
  mutation removeCompletedSkillSheet($studentId: ID, $skillSheetId: ID) {
    removeCompletedSkillSheet(
      skillSheetId: $skillSheetId
      studentId: $studentId
    ) {
      _id
    }
  }
`;

export const REMOVE_RESOURCE_FROM_PRACTICE_PLAN = gql`
  mutation removeResourceFromPracticePlan($planId: ID!, $resourceId: ID!) {
    removeResourceFromPracticePlan(planId: $planId, resourceId: $resourceId) {
      _id
    }
  }
`;

export const STUDENT_LOGIN = gql`
  mutation studentLogin($email: String!, $password: String!) {
    studentLogin(email: $email, password: $password) {
      token
      student {
        _id
        email
      }
    }
  }
`;

export const TEACHER_LOGIN = gql`
  mutation teacherLogin($email: String!, $password: String!) {
    teacherLogin(email: $email, password: $password) {
      token
      teacher {
        _id
        email
      }
    }
  }
`;
