import React, { useState, useContext, useEffect } from "react";
import { Sheet, Typography, IconButton } from "@mui/joy";
import { styles } from "../../../../styles/studentDetailsStyles";
import { useTeacherContext } from "../../../../utils/Context";
import AddIcon from "@mui/icons-material/Add";
import RegularModal from "../../../common/Modal/RegularModal";
import CreatePiece from "./CreatePiece";
import { useMutation } from "@apollo/client";
import { ADD_PIECE } from "../../../../utils/mutations";
import { MobileContext } from "../../../../App";
import TeacherPieceTable from "./TeacherPieceTable";

// Component that controlls CreatePiece component and the mutation for creating a piece
const TeacherPiecesContainer = () => {
  const { teacher } = useTeacherContext(); // get the teacher from context
  const { isMobile } = useContext(MobileContext); // get the isMobile state from context
  const [open, setOpen] = useState(false); // state for opening and closing the modal
  const [createPiece] = useMutation(ADD_PIECE); // mutation for creating a piece
  const [pieceUrl, setPieceUrl] = useState(); // the url for the piece created by the Cloudinary widget to be passed to the mutation
  const [teacherPieces, setTeacherPieces] = useState(teacher.pieces); // the pieces array from the teacher object

  // update the teacherPieces state when the teacher object changes
  useEffect(() => {
    setTeacherPieces(teacher.pieces);
  }, [teacher, teacherPieces]);

  // function that calls the mutation to create a piece
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
          url: pieceUrl,
        },
      });
      alert("Added piece to your list");
      setTeacherPieces(...teacherPieces, piece.data.addPiece); // update the teacherPieces state with the new piece to be displayed in the table
      return piece;
    } catch (err) {
      alert("Could not add piece");
      console.error(err);
    }
  };

  return (
    <Sheet id="teacherPiecesContainer" sx={styles.card}>
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

      {/* Displays the pieces a teacher has created */}
      <TeacherPieceTable isMobile={isMobile} teacherPieces={teacherPieces} />

      {/* Modal for creating a new piece */}
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreatePiece
          createPieceFunc={createPieceFunc}
          pieceUrl={pieceUrl}
          setPieceUrl={setPieceUrl}
        />
      </RegularModal>
    </Sheet>
  );
};

export default TeacherPiecesContainer;
