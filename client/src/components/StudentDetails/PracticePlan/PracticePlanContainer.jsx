import React, { useState, useEffect } from "react";
import { Typography, Button, Card, Sheet } from "@mui/joy";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../../../utils/mutations";
import CreatePracticePlan from "./CreatePracticePlan";
import PracticePlanCard from "./PracticePlanCard";
import RegularModal from "../../common/Modal/RegularModal";
import Auth from "../../../utils/auth";
import { useStudentContext } from "../../../utils/Context";
import { styles } from "../../../styles/studentDetailsStyles";
import ProgressBar from "../../common/ProgressBar";

// displays practice plans from a student
export default function PracticePlanContainer() {
  const { student } = useStudentContext(); // get student from context
  const [open, setOpen] = useState(false); // for modal
  const [progressBarPercentage, setProgressBarPercentage] = useState(0); // set progress bar percentage
  const [totalPlanPoints, setTotalPlanPoints] = useState(0); // set total plan points
  const [totalCompletedPoints, setTotalCompletedPoints] = useState(0); // set total completed points

  const id = student._id;
  const practicePlans = student.practicePlans;
  const [studentPlans, setStudentPlans] = useState(practicePlans ?? []);

  // calculate total plan points for student
  useEffect(() => {
    let pointsArr = [];

    studentPlans?.map((plan) =>
      plan.assignments?.map((assignment) =>
        pointsArr.push(assignment.pointsWorth)
      )
    );
    const totalPoints = pointsArr?.reduce((acc, curr) => acc + curr, 0);
    setTotalPlanPoints(totalPoints);
  }, [setTotalPlanPoints, studentPlans]);

  // calculate total completed points from assignments for student
  useEffect(() => {
    let assignArr = [];
    studentPlans?.map((plan) =>
      plan.assignments?.forEach((assignment) => assignArr.push(assignment))
    );
    let completedArr = assignArr.filter(
      (assignment) => assignment.completed === true
    );
    let pointsArr = completedArr.map((assignment) => assignment.pointsWorth);
    let totalPoints = pointsArr.reduce((acc, curr) => acc + curr, 0);
    setTotalCompletedPoints(totalPoints);
  }, [setTotalCompletedPoints, studentPlans]);

  // calculate progress bar percentage to be displayed
  useEffect(() => {
    const percentage = Math.floor(
      (totalCompletedPoints / totalPlanPoints) * 100
    );
    setProgressBarPercentage(percentage);
  }, [setProgressBarPercentage, totalCompletedPoints, totalPlanPoints]);

  // update studentPlans when practicePlans changes
  useEffect(() => {
    setStudentPlans(practicePlans);
  }, [practicePlans]);

  const [createPracticePlan] = useMutation(ADD_PRACTICEPLAN);

  // function for creating a practice plan and adding it to the studentPlans array
  const createPracticePlanFunc = async (userInput) => {
    try {
      const { data } = await createPracticePlan({
        variables: { studentId: id, dateCreated: new Date(), ...userInput },
      });
      alert("Practice Plan created");
      // Update studentPlans with the new practice plan
      setOpen(false); // close modal
      setStudentPlans([...studentPlans, data.addPracticePlan]); // add new practice plan to studentPlans array to be displayed
    } catch (err) {
      console.error(err);
      alert("Could not create Practice Plan");
    }
  };

  // function for deleting a practice plan and removing it from the studentPlans array
  const handleDeletePracticePlan = (deletedPlanId) => {
    setStudentPlans(studentPlans.filter((plan) => plan._id !== deletedPlanId));
  };

  // if studentPlans is undefined, return loading message
  if (!studentPlans) {
    return <p>Loading practice plans...</p>;
  }

  return (
    <Card id="PracticePlanContainer" sx={styles.card}>
      <Typography level="h2">Practice Plans</Typography>
      <Typography level="h4">All Plan Points: {totalPlanPoints}</Typography>
      <Typography level="h4">
        Completed Points: {totalCompletedPoints}
      </Typography>
      <ProgressBar
        percentage={progressBarPercentage}
        width={"175px"}
        height={"175px"}
      />
      {/* Only teachers can create a practice plan */}
      {Auth.teacherLoggedIn() && (
        <>
          {/* Modal for creating practice plan */}
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
      {!studentPlans ? (
        <p>Loading practice plans...</p>
      ) : (
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            backgroundColor: "transparent",
          }}
        >
          {studentPlans.map((practicePlan, i) => (
            <PracticePlanCard
              practicePlan={practicePlan}
              studentId={id}
              key={practicePlan._id}
              onDelete={() => handleDeletePracticePlan(practicePlan._id)}
              totalPlanPoint={totalPlanPoints}
              setTotalPlanPoints={setTotalPlanPoints}
            />
          ))}
        </Sheet>
      )}
    </Card>
  );
}
