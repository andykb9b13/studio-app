import React, { Component } from "react";
import dateService from "../../utils/dates";
import { Typography, Card, Box, Grid } from "@mui/joy";

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      dateObj: dateService.makeDateObj(),
    };
    this.interval = null;
  }

  componentDidMount() {
    // Update the clock every second
    this.interval = setInterval(() => {
      this.setState({
        dateObj: dateService.makeDateObj(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    dateService.getTodaysDate();
    const { dateObj } = this.state;
    let minute = dateObj.minute;
    let seconds = dateObj.seconds;
    let hour = dateObj.hour;
    let daytime = "AM";
    if (dateObj.minute >= 0 && dateObj.minute < 10) {
      minute = `0${dateObj.minute}`;
    }
    if (dateObj.seconds >= 0 && dateObj.seconds < 10) {
      seconds = `0${dateObj.seconds}`;
    }
    if (dateObj.hour > 12) {
      hour = dateObj.hour - 12;
      daytime = "PM";
    }
    // const formattedTime = `${hour}:${minute}:${seconds} ${daytime}`;
    const formattedDate = `${dateObj.dayName}, ${dateObj.monthName} ${dateObj.date}, ${dateObj.year}`;

    return (
      <Card
        sx={{
          textAlign: "center",
          boxShadow: "1px 1px 5px grey",
          borderRadius: "5px",
          fontSize: "2em",
        }}
      >
        <Typography level="h3">{formattedDate}</Typography>
        <Grid display={"flex"} justifyContent={"center"}>
          <Box
            sx={{
              border: "1px solid black",
              width: "50px",
              borderRadius: "5px",
              marginX: "5px",
            }}
          >
            {hour}
          </Box>
          <Typography level="h5">:</Typography>
          <Box
            sx={{
              border: "1px solid black",
              width: "50px",
              borderRadius: "5px",
              marginX: "5px",
            }}
          >
            {minute}
          </Box>
          <Typography level="h5">:</Typography>
          <Box
            sx={{
              border: "1px solid black",
              width: "50px",
              borderRadius: "5px",
              marginX: "5px",
            }}
          >
            {seconds}
          </Box>
          <Typography level="h5">{daytime}</Typography>
        </Grid>
      </Card>
    );
  }
}

export default Clock;
