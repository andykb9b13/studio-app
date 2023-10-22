import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useStudentContext } from "../../utils/Context";
import { useTeacherContext } from "../../utils/Context";

// Register the required components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// This component displays a bar chart of the student's points and their progress compared to the studio average
const StudentPointsChart = () => {
  const { student } = useStudentContext(); // get student from context
  const { teacher } = useTeacherContext(); // get teacher from context. This will allow access to the studio average.
  const [earnedPoints, setEarnedPoints] = useState(0); // total points a student has earned from completed assignments and skill sheets
  const [studioAssignPointsAvg, setStudioAssignPointsAvg] = useState(); // studio average of completed assignments
  const [studioSheetPointsAvg, setStudioSheetPointsAvg] = useState(); // studio average of completed skill sheets

  // Sets the studio average for completed skill sheets
  useEffect(() => {
    let pointsArr = [];
    teacher?.students?.forEach((student) =>
      pointsArr.push(student.totalSheetPoints)
    );
    const studioSheetTotal = pointsArr.reduce((acc, curr) => acc + curr, 0);
    const studioSheetAvg = studioSheetTotal / teacher?.students?.length;
    setStudioSheetPointsAvg(studioSheetAvg);
  }, [teacher, setStudioSheetPointsAvg]);

  // Sets the studio average for completed assignments
  useEffect(() => {
    let pointsArr = [];
    teacher?.students?.forEach((student) =>
      pointsArr.push(student.totalCompletedPoints)
    );
    const studioAssignTotal = pointsArr.reduce((acc, curr) => acc + curr, 0);
    const studioAssignAvg = studioAssignTotal / teacher?.students?.length;
    setStudioAssignPointsAvg(studioAssignAvg);
  }, [teacher, setStudioAssignPointsAvg]);

  // Sets the earnedPoints for the student which is the total of points from completed assignments and skill sheets
  useEffect(() => {
    const totalPoints = student.totalCompletedPoints + student.totalSheetPoints;
    setEarnedPoints(totalPoints);
  }, [student, setEarnedPoints]);

  // ChartJS options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Points",
      },
    },
  };

  // ChartJS labels
  const labels = ["SkillSheets", "Assignments", "Total Points"];

  // ChartJS data
  const data = {
    labels,
    datasets: [
      {
        label: "My Points",
        data: [
          student.totalSheetPoints, // total points from completed skill sheets. This is from a virtual in the student model.
          student.totalCompletedPoints, // total points from completed assignments. This is from a virtual in the student model.
          earnedPoints, // total points from completed assignments and skill sheets
        ],
        backgroundColor: "rgba(102, 46, 155)",
      },
      {
        label: "Studio Average",
        data: [
          studioSheetPointsAvg,
          studioAssignPointsAvg,
          studioAssignPointsAvg + studioSheetPointsAvg,
        ],
        backgroundColor: "rgba(248, 102, 36)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default StudentPointsChart;
