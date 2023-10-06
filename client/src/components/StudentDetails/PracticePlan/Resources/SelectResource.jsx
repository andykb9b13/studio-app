import React, { useEffect, useState } from "react";
import { Card, Table, Typography, IconButton, Link } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";

const SelectResource = ({
  teacherResources,
  resources,
  selectResourceFunc,
}) => {
  console.log(teacherResources);
  const [alreadySelected, setAlreadySelected] = useState([]);

  useEffect(() => {
    const resourceArr = [];
    resources?.forEach((resource) => resourceArr.push(resource._id));
    setAlreadySelected(resourceArr);
  }, [resources, setAlreadySelected]);

  console.log(alreadySelected);

  return (
    <Card sx={{ width: "80vw", overflow: "auto", resize: "horizontal" }}>
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
                <td>
                  <Typography level="h6">
                    <Link href={resource.url} target="_blank">
                      {resource.resourceName}
                    </Link>
                  </Typography>
                </td>
                <td>
                  <Typography>{resource.resourceType}</Typography>
                </td>
                <td>
                  <Typography>{resource.description}</Typography>
                </td>
                <td>
                  <IconButton disabled={alreadySelected.includes(resource._id)}>
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
