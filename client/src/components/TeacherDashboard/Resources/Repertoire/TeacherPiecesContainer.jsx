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

const TeacherPiecesContainer = () => {
  const { teacher } = useTeacherContext();
  const { isMobile } = useContext(MobileContext);
  const [open, setOpen] = useState(false);
  const [createPiece] = useMutation(ADD_PIECE);
  const [pieceUrl, setPieceUrl] = useState();
  const [teacherPieces, setTeacherPieces] = useState(teacher.pieces);

  useEffect(() => {
    setTeacherPieces(teacher.pieces);
  }, [teacher, teacherPieces]);

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
      console.log(piece.data.addPiece);
      setTeacherPieces(...teacherPieces, piece.data.addPiece);
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
      <TeacherPieceTable isMobile={isMobile} teacherPieces={teacherPieces} />
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
