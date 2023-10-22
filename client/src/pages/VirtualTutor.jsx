import React from "react";
import TutorContainer from "../components/VirtualTutor/TutorContainer";
import { useState } from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/joy";
import { styles } from "../styles/studentDetailsStyles";
import RegularModal from "../components/common/Modal/RegularModal";
import {
  auralPromptInfo,
  conceptualPromptInfo,
  physicalPromptInfo,
  visualPromptInfo,
} from "../components/VirtualTutor/promptInfo";
import troubleshooting from "../assets/home/troubleshooting.png";
import VisualInfoCard from "../components/VirtualTutor/VisualInfoCard";
import AuralInfoCard from "../components/VirtualTutor/AuralInfoCard";
import PhysicalInfoCard from "../components/VirtualTutor/PhysicalInfoCard";
import { useStudentContext } from "../utils/Context";
import EmotionalInfoCard from "../components/VirtualTutor/EmotionalInfoCard";

// Component for the virtual tutor page
const VirtualTutor = () => {
  const [open, setOpen] = useState(null);
  const [index, setIndex] = useState(null);
  const [revealed, setRevealed] = useState(null);
  const { student } = useStudentContext();

  // Array of objects containing the information for each button
  const buttonInfo = [
    {
      id: 0,
      buttonName: "Visual",
      component: <TutorContainer index={1} promptInfo={visualPromptInfo} />,
    },
    {
      id: 1,
      buttonName: "Aural",
      component: <TutorContainer index={2} promptInfo={auralPromptInfo} />,
    },
    {
      id: 2,
      buttonName: "Physical",
      component: <TutorContainer index={3} promptInfo={physicalPromptInfo} />,
    },
    {
      id: 3,
      buttonName: "Emotional",
      component: <TutorContainer index={4} promptInfo={conceptualPromptInfo} />,
    },
  ];

  return (
    <Grid id="mainVitualTutorContainer" container sx={styles.sheet}>
      <Typography level="h1" textAlign={"center"}>
        Virtual Tutor
      </Typography>

      <Card id="virtualTutorCard" sx={styles.card}>
        <CardContent>
          <Typography level="h4" sx={{ mb: 3 }}>
            Hey <b>{student.firstName}</b>! You've come to the right place.
          </Typography>
          <img
            src={troubleshooting}
            alt="troubleshooting"
            style={{ width: "50%" }}
          />

          <Typography level="body1" sx={{ mb: 3 }}>
            Sometimes it can be challenging to figure out what is going wrong in
            your playing. You probably feel like you are trying to do it right
            but something is not clicking. Have no fear, this is where you can
            come to break down your problems and get back on track.
          </Typography>
          <Typography level="h5" textAlign={"center"}>
            Practicing music can be broken down into four main aspects.
          </Typography>

          <Typography level="h4" textAlign={"center"}>
            Click one to begin working with the tutor.
          </Typography>

          <Typography level="body2">
            (TIP: If you know which one you need to work on, dive right in. If
            you're not sure, explore each concept below to see which one you
            might need to work on.)
          </Typography>
        </CardContent>

        {buttonInfo.map((button) => (
          <React.Fragment key={button.buttonName}>
            <RegularModal
              key={button.id}
              open={open === button.buttonName.toLowerCase()}
              onRequestClose={() => setOpen(null)}
            >
              {button.component}
            </RegularModal>
            <Button
              onClick={() => {
                setIndex(button.id);
                setOpen(button.buttonName.toLowerCase());
              }}
            >
              {button.buttonName}
            </Button>
          </React.Fragment>
        ))}
      </Card>

      {/* Cards to be rendered depending on which is revealed */}
      <VisualInfoCard revealed={revealed} setRevealed={setRevealed} />
      <AuralInfoCard revealed={revealed} setRevealed={setRevealed} />
      <PhysicalInfoCard revealed={revealed} setRevealed={setRevealed} />
      <EmotionalInfoCard revealed={revealed} setRevealed={setRevealed} />
    </Grid>
  );
};

export default VirtualTutor;
