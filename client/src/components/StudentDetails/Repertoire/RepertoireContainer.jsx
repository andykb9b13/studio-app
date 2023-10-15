import React, { useState, useContext } from "react";
import { Sheet, Typography, Table, IconButton } from "@mui/joy";
import { styles } from "../../../styles/studentDetailsStyles";
import { useStudentContext, useTeacherContext } from "../../../utils/Context";
import AddIcon from "@mui/icons-material/Add";
import RegularModal from "../../common/Modal/RegularModal";
import CreatePiece from "../../TeacherDashboard/Resources/Repertoire/CreatePiece";
import { useMutation } from "@apollo/client";
import { ADD_PIECE } from "../../../utils/mutations";
import { MobileContext } from "../../../App";

const RepertoireContainer = () => {
  const { student } = useStudentContext();
  const { teacher } = useTeacherContext()
  const { isMobile } = useContext(MobileContext);
  const [open, setOpen] = useState(false);
  const [createPiece] = useMutation(ADD_PIECE);

  const createPieceFunc = async (userInput) => {
    try {
      const piece = await createPiece({
        variables: {
          teacherId: teacher._id,
          pieceName: userInput.pieceName,
          composer: userInput.composer,
          description: userInput.description,
          pieceType: userInput.pieceType,
          difficulty: userInput.difficulty,
        },
      });
      alert("Added piece to your repertoire");
      console.log(piece);
      return piece;
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
        <CreatePiece createPieceFunc={createPieceFunc} />
      </RegularModal>
    </Sheet>
  );
};

export default RepertoireContainer;
