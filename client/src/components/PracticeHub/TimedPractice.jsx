import React from "react";
import {
  Sheet,
  Typography,
  Button,
  Card,
  CardContent,
  Input,
  Grid,
  Box,
  CardActions,
} from "@mui/joy";

const TimedPractice = ({ student, setStatus }) => {
  return (
    <Grid container mt={4}>
      <Card variant="outlined" sx={{ mx: "auto" }}>
        <Typography level="h2">Timed Practice</Typography>
        <Typography level="body1">
          Hi there {student.firstName} {student.lastName}! Are you ready to
          practice your {student.instrument}?
        </Typography>
        <Box mx="auto">
          <Typography
            variant="outlined"
            color="primary"
            sx={{ fontSize: "10em" }}
          >
            60
          </Typography>
        </Box>
        <CardContent>
          <Typography level="h3">Set Time</Typography>
          <Input type="number" placeholder="minutes" />
        </CardContent>
        <CardActions sx={{ mx: "auto" }}>
          <Button color="success">Start</Button>
          <Button color="danger">Stop</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TimedPractice;
