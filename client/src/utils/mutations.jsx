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
    $source: String
    $assignmentType: String
    $specialNotes: String
    $metronome: String
    $pages: String
  ) {
    addAssignment(
      date: $date
      exerciseName: $exerciseName
      source: $source
      assignmentType: $assignmentType
      specialNotes: $specialNotes
      metronome: $metronome
      pages: $pages
    ) {
      date
      exerciseName
      source
      assignmentType
      specialNotes
      metronome
      pages
    }
  }
`;
