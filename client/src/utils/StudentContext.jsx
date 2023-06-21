import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children, studentData }) => {
  const [student, setStudent] = useState(studentData);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
