import React, { useState, useContext, useEffect } from "react";
import { Sheet, Typography, Table, IconButton } from "@mui/joy";
import { styles } from "../../../styles/studentDetailsStyles";
import { useStudentContext, useTeacherContext } from "../../../utils/Context";
import AddIcon from "@mui/icons-material/Add";
import RegularModal from "../../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import {
  EDIT_STUDENT,
  REMOVE_PIECE_FROM_STUDENT,
} from "../../../utils/mutations";
import { MobileContext } from "../../../App";
import SelectPieceTable from "./SelectPieceTable";
import { Delete } from "@mui/icons-material";

const StudentPiecesContainer = ({ student, teacher, pieces }) => {
  const { isMobile } = useContext(MobileContext);
  const [open, setOpen] = useState(false);
  const [completePiece] = useMutation(EDIT_STUDENT);
  const [removePiece] = useMutation(REMOVE_PIECE_FROM_STUDENT);
  const [sortedPieces, setSortedPieces] = useState([]);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const [studentPieces, setStudentPieces] = useState([]);

  useEffect(() => {
    setStudentPieces(student?.pieces);
  }, [student, setStudentPieces]);

  useEffect(() => {
    const pieceArr = [];
    student?.pieces?.forEach((piece) => pieceArr.push(piece._id));
    setAlreadySelected(pieceArr);
  }, [student, setAlreadySelected, studentPieces]);

  const selectPieceFunc = async (pieceId) => {
    try {
      const updatedStudent = await completePiece({
        variables: {
          studentId: student._id,
          pieceId: pieceId,
        },
      });
      alert("Added piece to your repertoire");
      setOpen(false);
      return updatedStudent;
    } catch (err) {
      alert("Could not add piece");
      console.error(err);
    }
  };

  const removePieceFunc = async (pieceId) => {
    try {
      const deletedPiece = await removePiece({
        variables: {
          studentId: student._id,
          pieceId: pieceId,
        },
      });
      alert("Piece removed from repertoire");
      setStudentPieces(studentPieces.filter((piece) => piece._id !== pieceId));
      return deletedPiece;
    } catch (err) {
      alert("Could not remove piece");
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentPieces &&
            studentPieces.map((piece) => (
              <tr key={piece._id}>
                <td>{piece.pieceName}</td>
                <td>{piece.composer}</td>
                {!isMobile && <td>{piece.description}</td>}
                <td>{piece.dateCompleted}</td>
                <td>{piece.pieceType}</td>
                <td>{piece.difficulty}</td>
                <td>
                  <IconButton
                    color="danger"
                    onClick={() => removePieceFunc(piece._id)}
                  >
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SelectPieceTable
          selectPieceFunc={selectPieceFunc}
          alreadySelected={alreadySelected}
          sortedPieces={sortedPieces}
          setSortedPieces={setSortedPieces}
          setAlreadySelected={setAlreadySelected}
          pieces={teacher?.pieces}
          teacher={teacher}
        />
      </RegularModal>
    </Sheet>
  );
};

export default StudentPiecesContainer;
