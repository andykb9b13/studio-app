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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentPointsChart = () => {
  const { student } = useStudentContext();
  const [earnedPoints, setEarnedPoints] = useState(0); // Total points from skillSheets and Assignments

  // Sets the earnedPoints which is the total of points from completed assignments and skill sheets
  useEffect(() => {
    const totalPoints = student.totalCompletedPoints + student.totalSheetPoints;
    setEarnedPoints(totalPoints);
  }, [student, setEarnedPoints]);

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

  const labels = ["SkillSheets", "Assignments", "Total Points"];

  const data = {
    labels,
    datasets: [
      {
        label: "My Points",
        data: [
          student.totalSheetPoints,
          student.totalCompletedPoints,
          earnedPoints,
        ],
        backgroundColor: "rgba(102, 46, 155)",
      },
      {
        label: "Studio Average",
        data: [200, 160, 450],
        backgroundColor: "rgba(248, 102, 36)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default StudentPointsChart;
