import { Link, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import RegularModal from "../../common/Modal/RegularModal";
import Auth from "../../../utils/auth";

const teacherResourceColDefs = ({
  open,
  setOpen,
  deleteResourceFunc,
  isMobile,
}) => {
  return [
    {
      headerName: "Resource Name",
      field: "resourceName",
      sort: "asc",
      flex: !isMobile ?? 1,
      filter: "agSetColumnFilter",
      cellRenderer: (params) => {
        return (
          <>
            <Link
              href={params.data.url}
              alt="resource url"
              target="_blank"
              sx={{ color: "blue" }}
            >
              <b>{params.data.resourceName}</b>
            </Link>
          </>
        );
      },
    },
    {
      headerName: "Resource Type",
      filter: "agSetColumnFilter",
      field: "resourceType",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "Description",
      filter: "agSetColumnFilter",
      field: "description",
      flex: !isMobile ?? 1,
    },
    {
      headerName: "Action",
      field: "",
      cellRenderer: (params) => {
        return (
          <>
            {Auth.teacherLoggedIn() && (
              <>
                <IconButton onClick={() => setOpen(true)} color="danger">
                  <DeleteIcon />
                </IconButton>
                <RegularModal
                  name="deleteResource"
                  open={open}
                  onRequestClose={() => setOpen(false)}
                >
                  <DeleteModalContent
                    onRequestClose={() => setOpen(false)}
                    confirmAction={() => deleteResourceFunc(params.data._id)}
                  />
                </RegularModal>
              </>
            )}
          </>
        );
      },
    },
  ];
};

export default teacherResourceColDefs;
