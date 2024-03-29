import React from "react";
import { Typography, IconButton, Table } from "@mui/joy";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { styles } from "../../../../styles/teacherStyles";

// Component that displays the teacher's pieces in a table
const TeacherPieceTable = ({ teacherPieces, isMobile }) => {
  return (
    <Table
      id="teacherPieceTable"
      aria-label="basic table"
      stickyHeader
      stripe="even"
      variant="soft"
      sx={styles.teacherPieceTable}
    >
      <thead>
        <tr>
          <th>
            <Typography>Piece</Typography>
          </th>
          {!isMobile && (
            <th>
              <Typography>Composer</Typography>
            </th>
          )}
          {!isMobile && (
            <th>
              <Typography>Description</Typography>
            </th>
          )}
          {!isMobile && (
            <th>
              <Typography>Type</Typography>
            </th>
          )}
          {!isMobile && (
            <th>
              <Typography>Difficulty</Typography>
            </th>
          )}
          <th>
            <Typography>File</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {teacherPieces?.length > 0 &&
          teacherPieces?.map((piece) => (
            <tr key={piece._id}>
              <td>
                <Typography>{piece.pieceName}</Typography>
              </td>
              {!isMobile && (
                <td>
                  <Typography>{piece.composer}</Typography>
                </td>
              )}
              {!isMobile && (
                <td>
                  <Typography>{piece.description}</Typography>
                </td>
              )}
              {!isMobile && (
                <td>
                  <Typography>{piece.pieceType}</Typography>
                </td>
              )}
              {!isMobile && (
                <td>
                  <Typography>{piece.difficulty}</Typography>
                </td>
              )}

              <Typography>
                <a href={piece.url} target="blank">
                  <IconButton
                    color={piece.url ? "success" : "neutral"}
                    disabled={piece.url ? false : true}
                  >
                    <FilePresentIcon />
                  </IconButton>
                </a>
              </Typography>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TeacherPieceTable;
