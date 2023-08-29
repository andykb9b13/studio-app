import React from "react";
import { Prompt } from "./Prompt";
import { Stepper, Step, StepLabel } from "@mui/material";

export const PromptStepper = ({
  promptInfo,
  active,
  setActive,
  activeStep,
  setActiveStep,
}) => {
  console.log(promptInfo);
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {promptInfo.map((prompt) => (
        <Step key={prompt.index}>
          <StepLabel>{prompt.step}</StepLabel>
          <Prompt
            key={prompt.index}
            active={active}
            setActive={setActive}
            title={prompt.title}
            text={prompt.text}
            index={prompt.index}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </Step>
      ))}
    </Stepper>
  );
};
