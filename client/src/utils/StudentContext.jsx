import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const updateStudents = (newValue) => {
    setStudents(newValue);
  };

  return (
    <StudentContext.Provider value={{ students, updateStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
