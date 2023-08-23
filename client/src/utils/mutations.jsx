import { gql } from "@apollo/client";

export const ADD_TEACHER = gql`
  mutation addTeacher(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    addTeacher(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      teacher {
        _id
        firstName
        lastName
        email
      }
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
    $resourceUrl: String
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
      resourceUrl: $resourceUrl
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
      resourceUrl
      completed
      pages
    }
  }
`;

export const COMPLETE_ASSIGNMENT = gql`
  mutation completeAssignment($assignmentId: ID!, $completed: Boolean) {
    completeAssignment(assignmentId: $assignmentId, completed: $completed) {
      completed
    }
  }
`;

export const ADD_SKILLSHEET = gql`
  mutation addSkillSheet(
    $sheetName: String!
    $teacherId: String
    $scales: String
    $description: String
    $difficulty: String
    $arpeggios: String
    $articulation: String
    $slurs: String
    $longTones: String
    $exercises: String
    $etudes: String
    $pieces: String
  ) {
    addSkillSheet(
      sheetName: $sheetName
      teacherId: $teacherId
      scales: $scales
      arpeggios: $arpeggios
      description: $description
      difficulty: $difficulty
      articulation: $articulation
      slurs: $slurs
      longTones: $longTones
      exercises: $exercises
      etudes: $etudes
      pieces: $pieces
    ) {
      sheetName
      teacherId
      scales
      arpeggios
      description
      difficulty
      articulation
      slurs
      longTones
      exercises
      etudes
      pieces
    }
  }
`;

export const ADD_PRACTICEPLAN = gql`
  mutation addPracticePlan(
    $name: String!
    $studentId: String
    $planNotes: String
  ) {
    addPracticePlan(name: $name, studentId: $studentId, planNotes: $planNotes) {
      _id
      name
      studentId
      planNotes
    }
  }
`;

export const ADD_RESOURCE = gql`
  mutation addResource(
    $practicePlanId: String
    $resourceName: String
    $url: String
    $description: String
  ) {
    addResource(
      practicePlanId: $practicePlanId
      resourceName: $resourceName
      url: $url
      description: $description
    ) {
      _id
      practicePlanId
      resourceName
      url
      description
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
    $isActive: Boolean
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
      isActive: $isActive
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
