import React from "react";
import { Typography, Card, Link, IconButton, Box } from "@mui/joy";
import { useMutation } from "@apollo/client";
import { REMOVE_RESOURCE_FROM_PRACTICE_PLAN } from "../../../../utils/mutations";
import ClearIcon from "@mui/icons-material/Clear";
import { Divider } from "@mui/material";
import Auth from "../../../../utils/auth";

const ResourceContainer = ({ resources, setResources, practicePlan }) => {
  const [removeResourceFromPracticePlan] = useMutation(
    REMOVE_RESOURCE_FROM_PRACTICE_PLAN
  );

  const removeResourceFunc = async (resourceId) => {
    try {
      await removeResourceFromPracticePlan({
        variables: {
          resourceId: resourceId,
          planId: practicePlan._id,
        },
      });
      alert("Resource removed from plan!");
      setResources(resources.filter((resource) => resource._id !== resourceId));
    } catch (err) {
      alert("Could not remove resource from plan");
      console.error(err);
    }
  };

  return (
    <Card>
      <Typography level="h3">Resource Links</Typography>

      {resources &&
        resources.map((resource, i) => (
          <React.Fragment key={i}>
            <Box>
              <Link
                href={resource.url}
                alt="resource url"
                target="_blank"
                sx={{ fontSize: "1.5em" }}
              >
                {resource.resourceName}
              </Link>
              {Auth.teacherLoggedIn() && (
                <IconButton
                  color="neutral"
                  onClick={() => removeResourceFunc(resource._id)}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Box>

            <Typography>{resource.description}</Typography>
            <Divider />
          </React.Fragment>
        ))}
    </Card>
  );
};

export default ResourceContainer;
