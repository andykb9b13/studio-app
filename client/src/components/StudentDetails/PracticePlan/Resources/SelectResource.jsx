import { Card, Table, Typography, IconButton } from "@mui/joy";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

const SelectResource = ({ teacherResources, selectResourceFunc }) => {
  console.log(teacherResources);

  return (
    <Card
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
        whiteSpace: "pre-line",
      }}
    >
      <Typography level="h2" textAlign={"center"}>
        Select a Resource
      </Typography>
      <Table stickyHeader>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {teacherResources &&
            teacherResources.map((resource, i) => (
              <tr key={resource._id}>
                <td>{i + 1}</td>
                <td>{resource.resourceName}</td>
                <td>{resource.resourceType}</td>
                <td>{resource.description}</td>
                <td>
                  <IconButton>
                    <CheckIcon
                      onClick={() => {
                        selectResourceFunc(resource._id);
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

export default SelectResource;
