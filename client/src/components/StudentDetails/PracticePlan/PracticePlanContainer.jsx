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
  const { student } = useStudentContext();
  const [open, setOpen] = useState(false);
  const [progressBarPercentage, setProgressBarPercentage] = useState(0);
  const [totalPlanPoints, setTotalPlanPoints] = useState(0);
  const [totalCompletedPoints, setTotalCompletedPoints] = useState(0);

  const id = student._id;
  const practicePlans = student.practicePlans;
  const [studentPlans, setStudentPlans] = useState(practicePlans ?? []);

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

  useEffect(() => {
    const percentage = Math.floor(
      (totalCompletedPoints / totalPlanPoints) * 100
    );
    setProgressBarPercentage(percentage);
  }, [setProgressBarPercentage, totalCompletedPoints, totalPlanPoints]);

  useEffect(() => {
    setStudentPlans(practicePlans);
  }, [practicePlans]);

  const [createPracticePlan, { error }] = useMutation(ADD_PRACTICEPLAN);

  const createPracticePlanFunc = async (userInput) => {
    try {
      const { data } = await createPracticePlan({
        variables: { studentId: id, dateCreated: new Date(), ...userInput },
      });
      alert("Practice Plan created");
      // Update studentPlans with the new practice plan
      setOpen(false);
      setStudentPlans([...studentPlans, data.addPracticePlan]);
    } catch (err) {
      console.error(err);
      alert("Could not create Practice Plan");
    }
  };

  const handleDeletePracticePlan = (deletedPlanId) => {
    setStudentPlans(studentPlans.filter((plan) => plan._id !== deletedPlanId));
  };

  if (!studentPlans) {
    return <p>Loading practice plans...</p>;
  }

  return (
    <Card sx={styles.card}>
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
