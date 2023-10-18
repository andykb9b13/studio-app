import React from "react";
import { Card, Typography, Table, IconButton } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";

const SelectPieceTable = ({
  selectPieceFunc,
  sortedPieces,
  alreadySelected,
  pieces,
}) => {
  console.log(pieces);

  return (
    <Card sx={{ width: "80vw", overflow: "auto", resize: "horizontal" }}>
      <Typography level="h2" textAlign={"center"}>
        Select A Piece
      </Typography>
      <Table stickyheader>
        <thead>
          <tr>
            <th></th>
            <th>Piece Name</th>
            <th>Composer</th>
            <th>Description</th>
            <th>Piece Type</th>
            <th>Difficulty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pieces &&
            pieces?.map((piece, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{piece.pieceName}</td>
                <td>{piece.composer}</td>
                <td>{piece.description}</td>
                <td>{piece.pieceType}</td>
                <td>{piece.difficulty}</td>
                <td>URL</td>
                <td>
                  <IconButton disabled={alreadySelected.includes(piece._id)}>
                    <CheckIcon
                      onClick={() => {
                        console.log(piece);
                        selectPieceFunc(piece._id);
                      }}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default SelectPieceTable;
