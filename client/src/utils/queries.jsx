import { gql } from "@apollo/client";

export const QUERY_AUTHOR = gql`
  query Author($authorId: ID!, $isTeacher: Boolean!) {
    author(authorId: $authorId, isTeacher: $isTeacher) {
      ... on Teacher {
        _id
        firstName
        lastName
      }
      ... on Student {
        _id
        firstName
        lastName
        username
        avatarId
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query Query($studioId: ID!) {
    posts(studioId: $studioId) {
      _id
      createdAt
      isTeacher
      likes
      message
      studioId
      title
      url
      authorId {
        _id
        email
        firstName
        lastName
      }
      comments {
        authorId
        _id
        message
        createdAt
        isTeacher
        comments {
          authorId
          _id
          message
          createdAt
          isTeacher
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
        resourceType
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
      streaks {
        _id
        assignmentId
        blunders
        date
        exerciseName
        mostInARow
        successes
        successPercentage
      }
      pieces {
        _id
        pieceName
        composer
        description
        pieceType
        difficulty
        url
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
          resourceType
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
            blunders
            date
            exerciseName
            mostInARow
            studentId
            successes
            successPercentage
            totalTries
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

export const QUERY_STUDENTS = gql`
  query students($teacherId: ID!) {
    students(teacherId: $teacherId) {
      _id
      isActive
      avatarId
      username
      totalSheetPoints
      totalPlanPoints
      totalCompletedPoints
    }
  }
`;

export const QUERY_TEACHER = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      _id
      firstName
      email
      lastName
      password
      avatarId
      aboutInfo
      phoneNumber
      username
      resourceTypes
      pieces {
        _id
        pieceName
        composer
        description
        pieceType
        difficulty
        url
      }
      posts {
        _id
        createdAt
        isTeacher
        likes
        message
        studioId
        title
        url
        comments {
          _id
          authorId
          createdAt
          isTeacher
          likes
          message
          postId
        }
      }
      resources {
        _id
        teacherId
        practicePlanId
        resourceName
        url
        description
        resourceType
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
        totalCompletedPoints
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
