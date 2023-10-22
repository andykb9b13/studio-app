import React, { useEffect, useState } from "react";
import { Table, Link, Typography, IconButton, Sheet } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import RegularModal from "../../common/Modal/RegularModal";
import { sortResources } from "../../../utils/utilities";

// Component for displaying the resources a teacher has created in a table
const TeacherReasourceTable = ({
  deleteResourceFunc,
  resources,
  open,
  setOpen,
}) => {
  const [sortedResources, setSortedResources] = useState(); // state for the resources to be sorted

  // sort the resources when the resources prop changes
  useEffect(() => {
    setSortedResources(sortResources(resources));
  }, [resources]);

  return (
    <Sheet>
      <Table id="teacherResourceTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Resource Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {sortedResources &&
            sortedResources?.map((resource) => (
              <tr key={resource._id}>
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

                {/* Modal for deleting a resource */}
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
                    confirmAction={() => deleteResourceFunc(resource._id)}
                  />
                </RegularModal>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default TeacherReasourceTable;
