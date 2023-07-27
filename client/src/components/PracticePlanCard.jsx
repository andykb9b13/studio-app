import React, { useState, useContext } from "react";
import CreatePracticePlan from "../components/CreatePracticePlan";
import PracticePlan from "../components/PracticePlan";
import { Typography, Button } from "@mui/joy";
import { StudentContext } from "../pages/StudentDetails";

// displays practice plans from a student
export default function PracticePlanCard() {
  const { id, practicePlans } = useContext(StudentContext);
  const [open, setOpen] = useState(false);

  // handles opening the create practice plan component
  const handlePlanClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Typography level="h2">Practice Plans</Typography>
      <Button onClick={() => handlePlanClick()}>Create Practice Plan</Button>
      {open ? <CreatePracticePlan /> : ""}
      {practicePlans &&
        practicePlans.map((practicePlan) => (
          <PracticePlan
            practicePlan={practicePlan}
            studentId={id}
            key={practicePlan._id}
          />
        ))}
    </React.Fragment>
  );
}
