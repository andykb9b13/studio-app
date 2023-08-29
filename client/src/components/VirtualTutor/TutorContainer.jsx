import React, { useState } from "react";
import { Sheet } from "@mui/joy";

import {
  VisualHeader,
  AuralHeader,
  PhysicalHeader,
  ConceptualHeader,
} from "./Headers";
import VerticalLinearStepper from "./VerticalStepper";

const TutorContainer = ({ index, promptInfo }) => {
  // const [active, setActive] = useState(0);
  // const [activeStep, setActiveStep] = useState(1);

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
      {index === 1 && <VisualHeader />}
      {index === 2 && <AuralHeader />}
      {index === 3 && <PhysicalHeader />}
      {index === 4 && <ConceptualHeader />}

      <VerticalLinearStepper promptInfo={promptInfo} />
    </Sheet>
  );
};

export default TutorContainer;
