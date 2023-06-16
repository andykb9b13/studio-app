import { gql } from "@apollo/client";

export const ADD_TEACHER = gql`
  mutation addTeacher(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addTeacher(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
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

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      teacher {
        _id
        email
      }
    }
  }
`;

export const ADD_ASSIGNMENT = gql`
  mutation addAssignment(
    $date: String!
    $exerciseName: String!
    $studentId: String
    $source: String
    $assignmentType: String
    $specialNotes: String
    $metronome: String
    $pages: String
  ) {
    addAssignment(
      date: $date
      exerciseName: $exerciseName
      studentId: $studentId
      source: $source
      assignmentType: $assignmentType
      specialNotes: $specialNotes
      metronome: $metronome
      pages: $pages
    ) {
      date
      exerciseName
      studentId
      source
      assignmentType
      specialNotes
      metronome
      pages
    }
  }
`;

export const ADD_SKILLSHEET = gql`
  mutation addSkillSheet(
    $sheetName: String!
    $teacherId: String
    $scales: String
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
  mutation addPracticePlan($name: String!) {
    addPracticePlan(name: $name) {
      _id
      name
    }
  }
`;
