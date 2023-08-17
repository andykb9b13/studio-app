import React, { useState, useContext } from "react";
import CreatePracticePlan from "./CreatePracticePlan";
import PracticePlan from "./PracticePlan";
import { Typography, Button } from "@mui/joy";
import { StudentContext } from "../../../pages/StudentDetails";
import RegularModal from "../../common/Modal/RegularModal";

// displays practice plans from a student
export default function PracticePlanCard() {
  const { id, practicePlans } = useContext(StudentContext);
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Typography level="h2">Practice Plans</Typography>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreatePracticePlan
          onRequestClose={() => setOpen(false)}
          resourceName="Create Practice Plan"
        />
      </RegularModal>
      <Button onClick={() => setOpen(true)}>Create Practice Plan</Button>
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
