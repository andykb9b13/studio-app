import { Typography, IconButton } from "@mui/joy";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const teacherPieceColDefs = ({ isMobile }) => {
  return [
    {
      headerName: "Piece",
      field: "pieceName",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "Composer",
      field: "composer",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "Description",
      field: "description",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "Type",
      field: "pieceType",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "Difficulty",
      field: "difficulty",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "File",
      field: "url",
      cellRenderer: (params) => {
        return (
          <Typography>
            <a href={params.data.url} target="blank">
              <IconButton
                color={params.data.url ? "success" : "neutral"}
                disabled={params.data.url ? false : true}
              >
                <FilePresentIcon />
              </IconButton>
            </a>
          </Typography>
        );
      },
    },
  ];
};

export default teacherPieceColDefs;
