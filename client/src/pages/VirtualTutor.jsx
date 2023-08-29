import React from "react";
import TutorContainer from "../components/VirtualTutor/TutorContainer";
import { useState } from "react";
import {
  Typography,
  Button,
  Sheet,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
} from "@mui/joy";
import { List, ListItem, ListItemText } from "@mui/material";
import { styles } from "../styles/studentDetailsStyles";
import RegularModal from "../components/common/Modal/RegularModal";
import {
  auralPromptInfo,
  conceptualPromptInfo,
  physicalPromptInfo,
  visualPromptInfo,
} from "../components/VirtualTutor/promptInfo";
import troubleshooting from "../assets/home/troubleshooting.png";

const VirtualTutor = () => {
  const [open, setOpen] = useState(null);
  const [index, setIndex] = useState(null);

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
      buttonName: "Conceptual",
      component: <TutorContainer index={4} promptInfo={conceptualPromptInfo} />,
    },
  ];

  return (
    <Grid container sx={styles.sheet}>
      <Typography level="h1" textAlign={"center"}>
        Virtual Tutor
      </Typography>

      <Card variant="outlined" sx={styles.card}>
        <CardContent>
          <img
            src={troubleshooting}
            alt="troubleshooting"
            style={{ width: "50%" }}
          />
          <Typography level="h4">
            You've got this!!! Let's figure out what's going on.
          </Typography>
          <Typography level="body1">
            Sometimes it can be hard to figure out what you need to work on.
            These are some first steps to see if any of these need work. LOOK
            FOR HESITATION WHEN YOU DO THESE. If you hesitate with any of them,
            repeat it until you don't have hesitation.
          </Typography>
          <Divider />
          <Typography level="h4">
            Playing the instrument can be broken down into four main categories
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
    </Grid>
  );
};

export default VirtualTutor;
