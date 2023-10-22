import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Sheet, Table, Typography } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import { useTeacherContext } from "../../utils/Context";
import { avatarList } from "../common/Assets";
import { QUERY_STUDENTS } from "../../utils/queries";
import { sortArray } from "../../utils/utilities";
import { MobileContext } from "../../App";
import CountUp from "react-countup";

// Component for displaying the ranking of students based on their points
const Leaderboard = () => {
  const { isMobile } = useContext(MobileContext); // get isMobile from context to determine styling
  const { teacher } = useTeacherContext(); // get teacher from context
  // Making a query to get all the students to be able to access their points
  const { data } = useQuery(QUERY_STUDENTS, {
    variables: {
      teacherId: teacher._id,
    },
  });

  const [students, setStudents] = useState(); // state for storing the students
  const [sortedStudents, setSortedStudents] = useState(); // state for storing the sorted students

  // Sets the students state when the data is returned from the query
  useEffect(() => {
    setStudents(data?.students);
  }, [data, setStudents]);

  // Sorts the students by their total points using the sortArray function from utilities
  useEffect(() => {
    if (Array.isArray(students)) {
      setSortedStudents(sortArray(students));
    }
  }, [setSortedStudents, students]);

  return (
    <Sheet id="leaderboard" sx={!isMobile ? styles.card : styles.mobileCard}>
      <Typography level="h2" textAlign={"Center"}>
        Points Leaderboard
      </Typography>
      <Table>
        <thead>
          <tr>
            <th>
              <Typography level="h4">Rank</Typography>
            </th>
            <th>
              <Typography level="h4">Avatar</Typography>
            </th>
            <th>
              <Typography level="h4">User</Typography>
            </th>
            <th>
              <Typography level="h4">Points</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents?.map((student, i) => (
            <tr key={student._id}>
              <td>
                <Typography fontSize={"1.2em"}>{i + 1}</Typography>
              </td>
              <td>
                <img
                  src={
                    student.avatarId
                      ? avatarList[student.avatarId].name
                      : avatarList[0].name
                  }
                  alt="avatar"
                  style={{
                    borderRadius: "50%",
                    width: "35%",
                    marginInline: "auto",
                  }}
                />
              </td>
              <td>
                <Typography fontSize={"1.2em"}>{student.username}</Typography>
              </td>

              <td>
                <Typography fontSize={"1.2em"} fontWeight={"bold"}>
                  <CountUp
                    end={
                      student.totalCompletedPoints + student.totalSheetPoints
                    }
                  />
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default Leaderboard;
