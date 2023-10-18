import React, { useState, useContext, useEffect } from "react";
import { Sheet, Typography, Table, IconButton } from "@mui/joy";
import { styles } from "../../../styles/studentDetailsStyles";
import { useStudentContext, useTeacherContext } from "../../../utils/Context";
import AddIcon from "@mui/icons-material/Add";
import RegularModal from "../../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../../utils/mutations";
import { MobileContext } from "../../../App";
import SelectPieceTable from "./SelectPieceTable";
import { sortResources } from "../../../utils/utilities";

const StudentPiecesContainer = () => {
  const { student } = useStudentContext();
  const { teacher } = useTeacherContext();
  const { isMobile } = useContext(MobileContext);
  const [open, setOpen] = useState(false);
  const [completePiece] = useMutation(EDIT_STUDENT);
  const [sortedPieces, setSortedPieces] = useState([]);
  const [alreadySelected, setAlreadySelected] = useState([]);

  useEffect(() => {
    const pieceArr = [];
    student?.pieces?.forEach((piece) => pieceArr.push(piece._id));
    setAlreadySelected(pieceArr);
  }, [student, setAlreadySelected]);

  console.log(student.pieces);

  // const sortPieces = (pieces) => {
  //   console.log(pieces);
  //   const pieceNameArr = [];
  //   const sortedPieceArr = [];
  //   pieces?.forEach((piece) => pieceNameArr.push(piece.pieceName));
  //   // console.log(pieceNameArr);
  //   pieceNameArr?.sort();

  //   for (let i = 0; i < pieces.length; i++) {
  //     for (let j = 0; j < pieces.length; j++) {
  //       if (pieces[j].resourceName === pieceNameArr[i]) {
  //         sortedPieceArr.push(pieces[j]);
  //       }
  //     }
  //   }
  //   console.log(sortedPieceArr);
  //   return sortedPieceArr;
  // };

  // useEffect(() => {
  //   const sortedPieces = sortPieces(teacher?.pieces);
  //   setSortedPieces(sortedPieces);
  // }, [teacher]);

  const selectPieceFunc = async (pieceId) => {
    console.log(pieceId);
    try {
      const updatedStudent = await completePiece({
        variables: {
          studentId: student._id,
          pieceId: pieceId,
        },
      });
      alert("Added piece to your repertoire");
      console.log(updatedStudent);
      return updatedStudent;
    } catch (err) {
      alert("Could not add piece");
      console.error(err);
    }
  };

  return (
    <Sheet sx={styles.card}>
      <Typography
        level="h2"
        endDecorator={
          <IconButton onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        }
      >
        Repertoire
      </Typography>
      <Table
        aria-label="basic table"
        stickyHeader
        stripe="even"
        variant="soft"
        sx={{
          borderRadius: "4px",
          boxShadow: "lg",
          p: 2,
          backgroundColor: "rgb(102, 46, 155, 0.2)",
        }}
      >
        <thead>
          <tr>
            <th>Piece</th>
            <th>Composer</th>
            {!isMobile && <th>Description</th>}
            <th>Date Completed</th>
            <th>Type</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {student?.pieces &&
            student.pieces.map((piece) => (
              <tr key={piece._id}>
                <td>{piece.pieceName}</td>
                <td>{piece.composer}</td>
                {!isMobile && <td>{piece.description}</td>}
                <td>{piece.dateCompleted}</td>
                <td>{piece.pieceType}</td>
                <td>{piece.difficulty}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SelectPieceTable
          selectPieceFunc={selectPieceFunc}
          alreadySelected={alreadySelected}
          sortedPieces={sortedPieces}
          pieces={teacher?.pieces}
        />
      </RegularModal>
    </Sheet>
  );
};

export default StudentPiecesContainer;
