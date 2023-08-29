import React from "react";
import { Typography, Button } from "@mui/joy";

export const VisualHeader = ({ setActive }) => {
  <>
    <Typography level="h1">Visual</Typography>
    <Typography level="h2">
      Trouble with note names, rhythms, slide positions/fingerings, etc.
    </Typography>
    <Typography level="body1">
      These will check to see if you are having and trouble understanding what
      the dots on the page are telling you to do.
    </Typography>
    <Button onClick={() => setActive(1)}>Go On</Button>
  </>;
};

export const AuralHeader = ({ setActive }) => {
  <>
    <Typography level="h1">Visual</Typography>
    <Typography level="h2">
      Trouble with note names, rhythms, slide positions/fingerings, etc.
    </Typography>
    <Typography level="body1">
      These will check to see if you are having and trouble understanding what
      the dots on the page are telling you to do.
    </Typography>
    <Button onClick={() => setActive(1)}>Go On</Button>
  </>;
};

export const PhysicalHeader = ({ setActive }) => {
  <>
    <Typography level="h1">Visual</Typography>
    <Typography level="h2">
      Trouble with note names, rhythms, slide positions/fingerings, etc.
    </Typography>
    <Typography level="body1">
      These will check to see if you are having and trouble understanding what
      the dots on the page are telling you to do.
    </Typography>
    <Button onClick={() => setActive(1)}>Go On</Button>
  </>;
};

export const ConceptualHeader = ({ setActive }) => {
  <>
    <Typography level="h1">Visual</Typography>
    <Typography level="h2">
      Trouble with note names, rhythms, slide positions/fingerings, etc.
    </Typography>
    <Typography level="body1">
      These will check to see if you are having and trouble understanding what
      the dots on the page are telling you to do.
    </Typography>
    <Button onClick={() => setActive(1)}>Go On</Button>
  </>;
};
