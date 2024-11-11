import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";

const studentColDefs = ({ open, setOpen, deleteStudentFunc, isMobile }) => {
  return [
    {
      header: "First Name",
      field: "firstName",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Last Name",
      field: "lastName",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Email",
      field: "primaryContactEmail",
    },
    {
      headerName: "Is Active?",
      field: "isActive",
      filter: "agSetColumnFilter",
      sort: "desc",
      valueGetter: (params) => {
        if (params.data.isActive) {
          return "Yes";
        } else {
          return "No";
        }
      },
    },
    {
      headerName: "Lesson Day",
      field: "lessonDay",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Actions",
      field: "",
      sortable: false,
      cellRenderer: (params) => {
        return (
          <>
            {/* Button and Modal for deleting a student */}
            <IconButton
              onClick={() => deleteStudentFunc(params.data._id)}
              color="danger"
              sx={{ mx: 1, color: "#bb2124" }}
            >
              <Delete />
            </IconButton>
            <RegularModal open={open} onRequestClose={() => setOpen(false)}>
              <DeleteModalContent
                onRequestClose={() => setOpen(false)}
                confirmAction={() => deleteStudentFunc(params.data._id)}
                resourceName="student"
              />
            </RegularModal>
          </>
        );
      },
    },
  ];
};

export default studentColDefs;
