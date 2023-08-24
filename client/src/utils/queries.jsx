import { gql } from "@apollo/client";

export const QUERY_TEACHER = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      _id
      firstName
      email
      lastName
      password
      skillSheets {
        _id
        arpeggios
        articulation
        completed
        description
        difficulty
        etudes
        exercises
        longTones
        pieces
        scales
        sheetName
        slurs
        teacherId
      }
      students {
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
      username
      grade
      isActive
      lessonDay
      lessonLocation
      lessonTime
      school
      totalPlanPoints
      totalCompletedPoints
      practicePlans {
        _id
        name
        planNotes
        resources {
          _id
          resourceName
          url
          description
        }
        assignments {
          _id
          exerciseName
          assignmentType
          source
          pages
          metronome
          specialNotes
          studentId
          completed
          pointsWorth
          planId
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
          description
          difficulty
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

export const QUERY_PRACTICEPLANS = gql`
  query practicePlans($studentId: ID!) {
    practicePlans(studentId: $student) {
      _id
      name
      planNotes
      resources {
        _id
        resourceName
        url
        description
      }
      assignments {
        _id
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
        description
        difficulty
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
