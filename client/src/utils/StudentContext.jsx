import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState([]);

  const updateStudent = (newValue) => {
    setStudent(newValue);
  };

  return (
    <StudentContext.Provider value={{ student, updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
