import { gql } from "@apollo/client";

export const QUERY_TEACHER = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      _id
      firstName
      lastName
      email
      students {
        _id
        firstName
        lastName
        email
        primaryContact
        primaryContactEmail
        instrument
        lessonDay
        lessonTime
        grade
        school
        lessonLocation
        isActive
        teacherId
      }
    }
  }
`;
