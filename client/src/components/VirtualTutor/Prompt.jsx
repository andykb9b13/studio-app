import React from "react";
import { Typography, Card, CardActions, Button } from "@mui/joy";

export function Prompt({
  index,
  title,
  text,
  setActive,
  active,
  activeStep,
  setActiveStep,
}) {
  return (
    <>
      {active === index && (
        <Card>
          <Typography level="h4">{title}</Typography>
          <Typography level="body1">{text}</Typography>

          <CardActions>
            <Button
              onClick={() => {
                setActiveStep(activeStep - 1);
                setActive(active - 1);
              }}
            >
              Got it!
            </Button>
            <Button
              onClick={() => {
                setActiveStep(activeStep + 1);
                setActive(active + 1);
              }}
            >
              Still Hard
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}
