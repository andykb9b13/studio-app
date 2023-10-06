import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Sheet, Table, Typography } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import { useTeacherContext } from "../../utils/Context";
import { avatarList } from "../common/Assets";
import { QUERY_STUDENTS } from "../../utils/queries";
import { sortArray } from "../../utils/utilities";
import { MobileContext } from "../../App";

// Here we are going to display the the usernames of the students, their avatars, and and their respective points. They need to be sorted by highest to lowest points

const Leaderboard = () => {
  const { isMobile } = useContext(MobileContext);
  const { teacher } = useTeacherContext();
  const { data } = useQuery(QUERY_STUDENTS, {
    variables: {
      teacherId: teacher._id,
    },
  });

  const [students, setStudents] = useState();
  const [sortedStudents, setSortedStudents] = useState();

  useEffect(() => {
    setStudents(data?.students);
  }, [data, setStudents]);

  useEffect(() => {
    if (Array.isArray(students)) {
      setSortedStudents(sortArray(students));
    }
  }, [setSortedStudents, students]);

  console.log(teacher._id);

  return (
    <Sheet sx={!isMobile ? styles.card : styles.mobileCard}>
      <Typography level="h2">Points Leaderboard</Typography>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Avatar</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents?.map((student, i) => (
            <tr key={student._id}>
              <td>{i + 1}</td>
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
              <td>{student.username}</td>

              <td>{student.totalCompletedPoints + student.totalSheetPoints}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default Leaderboard;
