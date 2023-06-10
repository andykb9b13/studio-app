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

// export const LOGIN = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//         email
//       }
//     }
//   }
// `;
