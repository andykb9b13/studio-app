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

export const QUERY_STUDENT = gql`
  query Student($studentId: ID!) {
    student(studentId: $studentId) {
      _id
      firstName
      lastName
      email
      instrument
      primaryContact
      primaryContactEmail
      teacherId
      grade
      isActive
      lessonDay
      lessonLocation
      lessonTime
      school
      weeklyPlans {
        _id
        name
        assignments {
          _id
          exerciseName
          date
          assignmentType
          source
          pages
          metronome
          specialNotes
          studentId
          streaks {
            _id
            assignmentId
            date
            numFail
            numSuccess
            numTries
          }
        }
        skillSheets {
          _id
          sheetName
          completed
          arpeggios
          articulation
          etudes
          exercises
          longTones
          pieces
          scales
          slurs
          teacherId
        }
        goals {
          _id
          practiceDays
          practiceTime
          skillSheet {
            _id
            sheetName
          }
        }
      }
    }
  }
`;

export const QUERY_PRACTICEPLAN = gql`
  query practicePlan($planId: ID!) {
    practicePlan(planId: $planId) {
      _id
      name
      assignments {
        _id
        date
        exerciseName
        source
        assignmentType
        specialNotes
        metronome
        pages
      }
      goals {
        practiceTime
        practiceDays
      }
      skillSheets {
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
        completed
      }
    }
  }
`;
