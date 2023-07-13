import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState("");

  const updateStudent = (newStudent) => {
    setStudent(newStudent);
  };

  return (
    <StudentContext.Provider value={{ student, setStudent: updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
