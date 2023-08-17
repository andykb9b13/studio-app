import React, { useState, useContext, useEffect } from "react";
import CreatePracticePlan from "./CreatePracticePlan";
import PracticePlanCard from "./PracticePlanCard";
import { Typography, Button } from "@mui/joy";
import { StudentContext } from "../../../pages/StudentDetails";
import RegularModal from "../../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../../../utils/mutations";

// displays practice plans from a student
export default function PracticePlanContainer() {
  const { id, practicePlans } = useContext(StudentContext);
  const [open, setOpen] = useState(false);
  const [studentPlans, setStudentPlans] = useState(practicePlans);

  useEffect(() => {
    setStudentPlans(practicePlans);
  }, [practicePlans]);

  const [createPracticePlan, { error }] = useMutation(ADD_PRACTICEPLAN);

  const createPracticePlanFunc = async (userInput) => {
    try {
      const { data } = await createPracticePlan({
        variables: { studentId: id, ...userInput },
      });
      alert("Practice Plan created");
      // Update studentPlans with the new practice plan
      setStudentPlans([...studentPlans, data.addPracticePlan]);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Could not create Practice Plan");
    }
  };

  return (
    <React.Fragment>
      <Typography level="h2">Practice Plans</Typography>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreatePracticePlan
          onRequestClose={() => setOpen(false)}
          resourceName="Create Practice Plan"
          createPracticePlanFunc={createPracticePlanFunc}
        />
      </RegularModal>
      <Button onClick={() => setOpen(true)}>Create Practice Plan</Button>
      {studentPlans &&
        studentPlans.map((practicePlan, i) => (
          <PracticePlanCard
            practicePlan={practicePlan}
            studentId={id}
            key={i}
          />
        ))}
    </React.Fragment>
  );
}
