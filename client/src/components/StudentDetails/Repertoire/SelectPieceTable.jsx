import React, { useEffect, useContext } from "react";
import { Card, Typography, Table, IconButton } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { MobileContext } from "../../../App";

const SelectPieceTable = ({
  selectPieceFunc,
  sortedPieces,
  setSortedPieces,
  teacher,
  setAlreadySelected,
  alreadySelected,
  pieces,
}) => {
  const { isMobile } = useContext(MobileContext);

  const sortPieces = (pieces) => {
    const pieceNameArr = [];
    const sortedPieceArr = [];
    pieces?.forEach((piece) => pieceNameArr.push(piece.pieceName));
    pieceNameArr.sort();
    for (let i = 0; i < pieces.length; i++) {
      for (let j = 0; j < pieces.length; j++) {
        if (pieces[j].pieceName === pieceNameArr[i]) {
          sortedPieceArr.push(pieces[j]);
        }
      }
    }
    return sortedPieceArr;
  };

  useEffect(() => {
    setSortedPieces(sortPieces(pieces));
  }, [pieces, setSortedPieces]);

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
            {!isMobile && <th>Composer</th>}
            {!isMobile && <th>Description</th>}
            {!isMobile && <th>Piece Type</th>}
            {!isMobile && <th>Difficulty</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedPieces &&
            sortedPieces?.map((piece, i) => (
              <tr key={piece._id}>
                <td>{i + 1}</td>
                <td>
                  <b>{piece.pieceName}</b>
                </td>
                {!isMobile && <td>{piece.composer}</td>}
                {!isMobile && <td>{piece.description}</td>}
                {!isMobile && <td>{piece.pieceType}</td>}
                {!isMobile && <td>{piece.difficulty}</td>}
                <td>
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
                </td>
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
