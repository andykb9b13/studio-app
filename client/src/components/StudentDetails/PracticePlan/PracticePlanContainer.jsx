import React, { useState, useContext, useEffect } from "react";
import { Typography, Button } from "@mui/joy";
import { StudentContext } from "../../../pages/StudentDetails";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../../../utils/mutations";
import CreatePracticePlan from "./CreatePracticePlan";
import PracticePlanCard from "./PracticePlanCard";
import RegularModal from "../../common/Modal/RegularModal";

// displays practice plans from a student
export default function PracticePlanContainer() {
  const { id, practicePlans } = useContext(StudentContext);
  const [open, setOpen] = useState(false);
  const [studentPlans, setStudentPlans] = useState(practicePlans);
  const [totalPlanPoints, setTotalPlanPoints] = useState(0);

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

  const handleDeletePracticePlan = (deletedPlanId) => {
    setStudentPlans(studentPlans.filter((plan) => plan._id !== deletedPlanId));
  };

  return (
    <React.Fragment>
      <Typography level="h2">Practice Plans</Typography>
      <Typography level="h4">
        Total Points for all Practice Plans: {totalPlanPoints}
      </Typography>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreatePracticePlan
          onRequestClose={() => setOpen(false)}
          resourceName="Create Practice Plan"
          createPracticePlanFunc={createPracticePlanFunc}
        />
      </RegularModal>
      <Button onClick={() => setOpen(true)}>Create Practice Plan</Button>
      {studentPlans &&
        studentPlans.map((practicePlan) => (
          <PracticePlanCard
            practicePlan={practicePlan}
            studentId={id}
            key={practicePlan._id}
            onDelete={() => handleDeletePracticePlan(practicePlan._id)}
            totalPlanPoint={totalPlanPoints}
            setTotalPlanPoints={setTotalPlanPoints}
          />
        ))}
    </React.Fragment>
  );
}
