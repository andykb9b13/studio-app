import React, { Component } from "react";
import dateService from "./dates";
import { Typography } from "@mui/joy";

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
    const formattedTime = `${hour}:${minute}:${seconds} ${daytime}`;
    const formattedDate = `${dateObj.dayName}, ${dateObj.monthName} ${dateObj.date}, ${dateObj.year}`;

    return (
      <>
        <Typography level="h2">
          <b>Time:</b> {formattedTime}
        </Typography>
        <Typography level="h3">
          <b>Today:</b> {formattedDate}
        </Typography>
      </>
    );
  }
}

export default Clock;
