import React, { createContext, useContext, useState, useEffect } from "react";

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

const TeacherContext = createContext();

export const useTeacherContext = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState({});

  return (
    <TeacherContext.Provider
      value={{
        teacher,
        setTeacher,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
