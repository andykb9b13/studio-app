import React from "react";
import Visual from "../components/VirtualTutor/Visual/Visual";
import Aural from "../components/VirtualTutor/Aural";
import Physical from "../components/VirtualTutor/Physical";
import Conceptual from "../components/VirtualTutor/Conceptual";
import { useState } from "react";
import {
  Typography,
  Button,
  Sheet,
  Card,
  CardContent,
  CardActions,
} from "@mui/joy";
import { styles } from "../styles/studentDetailsStyles";
import RegularModal from "../components/common/Modal/RegularModal";

const VirtualTutor = () => {
  const [open, setOpen] = useState(null);

  const buttonInfo = [
    { buttonName: "Visual", component: <Visual /> },
    { buttonName: "Aural", component: <Aural /> },
    { buttonName: "Physical", component: <Physical /> },
    { buttonName: "Conceptual", component: <Conceptual /> },
  ];

  return (
    <Sheet sx={styles.sheet}>
      <Typography level="h2" textAlign={"center"}>
        Virtual Tutor
      </Typography>
      <Card variant="outlined" sx={styles.card}>
        <CardContent>
          <>
            <Typography level="h4">
              You've got this!!! Let's figure out what's going on.
            </Typography>
            <Typography level="body1">
              Sometimes it can be hard to figure out what you need to work on.
              These are some first steps to see if any of these need work. LOOK
              FOR HESITATION WHEN YOU DO THESE. If you hesitate with any of
              them, repeat it until you don't have hesitation.
            </Typography>
          </>
        </CardContent>
        <CardActions>
          {buttonInfo.map((button) => (
            <React.Fragment key={button.buttonName}>
              <RegularModal
                key={button.buttonName}
                open={open === button.buttonName.toLowerCase()}
                onRequestClose={() => setOpen(null)}
              >
                {button.component}
              </RegularModal>
              <Button onClick={() => setOpen(button.buttonName.toLowerCase())}>
                {button.buttonName}
              </Button>
            </React.Fragment>
          ))}
        </CardActions>
      </Card>
    </Sheet>
  );
};

export default VirtualTutor;
