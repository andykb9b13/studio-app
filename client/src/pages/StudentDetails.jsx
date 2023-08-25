import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import { Sheet, Typography } from "@mui/joy";
import { styles } from "../styles/studentDetailsStyles";
import StudentDetailsCard from "../components/StudentDetails/StudentDetailsCard";
import Auth from "../utils/auth";

// Creating student context to be passed to all components in this thread
export const StudentContext = createContext();

// Top component in the tree for students. Provider is passing student info through context.
export default function StudentDetails() {
  const [active, setActive] = useState(0);
  const { id } = useParams();
  // query for finding individual student information
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  return (
    <StudentContext.Provider value={{ student, practicePlans, id }}>
      {Auth.loggedIn() ? (
        <Sheet sx={styles.sheet}>
          {/* Main student details section  */}
          <StudentDetailsCard active={active} setActive={setActive} />
        </Sheet>
      ) : (
        <Sheet>
          <Typography>Please Login </Typography>
        </Sheet>
      )}
    </StudentContext.Provider>
  );
}
