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
  const [studioAssignPointsAvg, setStudioAssignPointsAvg] = useState();
  const [studioSheetPointsAvg, setStudioSheetPointsAvg] = useState();

  const getSheetPointsAvg = (teacher) => {
    let pointsArr = [];
    teacher?.students?.forEach((student) =>
      pointsArr.push(student.totalSheetPoints)
    );
    const studioSheetAvg = pointsArr.reduce((acc, curr) => acc + curr, 0);
    return studioSheetAvg;
  };

  const getAssignPointsAvg = (teacher) => {
    let pointsArr = [];
    teacher?.students?.forEach((student) =>
      pointsArr.push(student.totalCompletedPoints)
    );
    const studioAssignAvg = pointsArr.reduce((acc, curr) => acc + curr, 0);
    return studioAssignAvg;
  };

  return (
    <TeacherContext.Provider
      value={{
        teacher,
        setTeacher,
        getAssignPointsAvg,
        getSheetPointsAvg,
        setStudioAssignPointsAvg,
        setStudioSheetPointsAvg,
        studioAssignPointsAvg,
        studioSheetPointsAvg,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
