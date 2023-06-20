import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "./queries";

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState([]);

  // I want to be able to find a specific student and then have that data persist
  // through the components that I will add to it. Not sure how to pass the studentId through.
  const { studentInfo } = useQuery(QUERY_STUDENT, {});

  console.log(studentInfo);

  return (
    <StudentContext.Provider value={{ student }}>
      {children}
    </StudentContext.Provider>
  );
};
