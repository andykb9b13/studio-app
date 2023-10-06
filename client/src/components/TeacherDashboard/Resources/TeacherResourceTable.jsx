import React from "react";
import { Table, Link, Typography, IconButton, Sheet } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import RegularModal from "../../common/Modal/RegularModal";

const TeacherReasourceTable = ({
  deleteResourceFunc,
  resources,
  open,
  setOpen,
}) => {
  console.log(resources);
  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Resource Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {resources &&
            resources.map((resource) => (
              <tr>
                <td>
                  <Link
                    href={resource.url}
                    alt="resource url"
                    target="_blank"
                    sx={{ color: "blue" }}
                    level="h5"
                  >
                    <b>{resource.resourceName}</b>
                  </Link>
                </td>
                <td>{resource.resourceType}</td>
                <td>
                  <Typography>{resource.description}</Typography>
                </td>
                <RegularModal
                  name="deleteResource"
                  open={open}
                  onRequestClose={() => setOpen(false)}
                >
                  <DeleteModalContent
                    onRequestClose={() => setOpen(false)}
                    confirmAction={() => deleteResourceFunc(resource._id)}
                  />
                </RegularModal>

                <IconButton onClick={() => setOpen(true)} color="danger">
                  <DeleteIcon />
                </IconButton>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default TeacherReasourceTable;
