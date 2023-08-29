import React, { useState } from "react";
import { Typography, Button, Sheet } from "@mui/joy";
import { visualPromptInfo } from "./visualPromptInfo";
import { PromptStepper } from "../common/Stepper";

const Visual = () => {
  const [active, setActive] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Sheet
      sx={{
        p: 1,
        borderRadius: "4px",
        mt: 1,
        boxShadow: "md",
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <PromptStepper
        promptInfo={visualPromptInfo}
        active={active}
        setActive={setActive}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
      {active === 0 && (
        <>
          <Typography level="h1">Visual</Typography>
          <Typography level="h2">
            Trouble with note names, rhythms, slide positions/fingerings, etc.
          </Typography>
          <Typography level="body1">
            These will check to see if you are having and trouble understanding
            what the dots on the page are telling you to do.
          </Typography>
          <Button onClick={() => setActive(1)}>Go On</Button>
        </>
      )}
    </Sheet>
  );
};

export default Visual;
