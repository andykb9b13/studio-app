import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({});

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
