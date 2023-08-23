import React, { useState, useContext, useEffect } from "react";
import { Typography, Button } from "@mui/joy";
import { StudentContext } from "../../../pages/StudentDetails";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../../../utils/mutations";
import CreatePracticePlan from "./Resources/CreatePracticePlan";
import PracticePlanCard from "./PracticePlanCard";
import RegularModal from "../../common/Modal/RegularModal";
import Auth from "../../../utils/auth";

// displays practice plans from a student
export default function PracticePlanContainer() {
  const { id, practicePlans } = useContext(StudentContext);
  const [open, setOpen] = useState(false);
  const [studentPlans, setStudentPlans] = useState(practicePlans);
  const [totalPlanPoints, setTotalPlanPoints] = useState(0);
  const [totalCompletedPoints, setTotalCompletedPoints] = useState(0);

  // useEffect(() => {
  //   setTotalPlanPoints(studentPlans.assignments);
  // });

  useEffect(() => {
    let pointsArr = [];
    studentPlans.map((plan) =>
      plan.assignments.map((assignment) =>
        pointsArr.push(assignment.pointsWorth)
      )
    );
    const totalPoints = pointsArr.reduce((acc, curr) => acc + curr);
    setTotalPlanPoints(totalPoints);
  }, [setTotalPlanPoints, studentPlans]);

  useEffect(() => {
    console.log(studentPlans);
    let assignArr = [];
    studentPlans.map((plan) =>
      plan.assignments.map((assignment) => assignArr.push(assignment))
    );
    let completedArr = assignArr.filter(
      (assignment) => assignment.completed === true
    );
    console.log(completedArr);
    let pointsArr = completedArr.map((assignment) => assignment.pointsWorth);
    console.log(pointsArr);
    let totalPoints = pointsArr.reduce((acc, curr) => acc + curr, 0);
    setTotalCompletedPoints(totalPoints);
  }, [setTotalCompletedPoints, studentPlans]);

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
      <Typography level="h4">
        Total Completed Points: {totalCompletedPoints}
      </Typography>
      {Auth.teacherLoggedIn() && (
        <>
          <RegularModal open={open} onRequestClose={() => setOpen(false)}>
            <CreatePracticePlan
              onRequestClose={() => setOpen(false)}
              resourceName="Create Practice Plan"
              createPracticePlanFunc={createPracticePlanFunc}
            />
          </RegularModal>
          <Button onClick={() => setOpen(true)}>Create Practice Plan</Button>
        </>
      )}

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
