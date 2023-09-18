import { gql } from "@apollo/client";

export const QUERY_TEACHER = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      _id
      firstName
      email
      lastName
      password
      resources {
        teacherId
        practicePlanId
        resourceName
        url
        description
      }
      skillSheets {
        _id
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
        completed
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
        avatarId
        username
        totalSheetPoints
        practicePlans {
          assignments {
            pointsWorth
          }
        }
        skillSheets {
          sheetPoints
        }
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
      avatarId
      totalPlanPoints
      totalCompletedPoints
      totalSheetPoints
      skillSheets {
        _id
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
        completed
      }
      practicePlans {
        _id
        name
        dateCreated
        planNotes
        resources {
          _id
          practicePlanId
          teacherId
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
      dateCreated
      planNotes
      resources {
        _id
        practicePlanId
        teacherId
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
        _id
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
        completed
      }
    }
  }
`;

export const QUERY_STUDENTS = gql`
  query students($teacherId: ID!) {
    students(teacherId: $teacherId) {
      _id
      avatarId
      username
      totalSheetPoints
      totalPlanPoints
      totalCompletedPoints
    }
  }
`;
