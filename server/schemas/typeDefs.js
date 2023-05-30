const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Student {
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

    type Query {
        students: [Student]!
        student(studentID: ID!): Student
    }

    type Mutation {
        addStudent(firstName: String!, lastName: String!, email: String, primaryContact: String!, primaryContactEmail: String!, instrument: String!, lessonDay: String, lessonTime: String, grade: String, school: String, lessonLocation: String, isActive: Boolean): Student
    }
}`;
