import React, { useState } from "react";
import { Sheet } from "@mui/joy";
import { PromptStepper } from "./Stepper";
import {
  VisualHeader,
  AuralHeader,
  PhysicalHeader,
  ConceptualHeader,
} from "./Headers";

const TutorContainer = ({ index, promptInfo }) => {
  const [active, setActive] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  console.log(index);

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
      {index === 1 && <VisualHeader setActive={setActive} />}
      {index === 2 && <AuralHeader setActive={setActive} />}
      {index === 3 && <PhysicalHeader setActive={setActive} />}
      {index === 4 && <ConceptualHeader setActive={setActive} />}
      <PromptStepper
        promptInfo={promptInfo}
        active={active}
        setActive={setActive}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
    </Sheet>
  );
};

export default TutorContainer;
