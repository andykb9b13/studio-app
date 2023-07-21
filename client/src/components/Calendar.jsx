import React, { useState } from "react";
import { Card, Sheet, Typography } from "@mui/joy";
import { DateCalendar } from "@mui/x-date-pickers";

const Calendar = () => {
  return (
    <Sheet>
      <Card>
        <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
      </Card>
      <Card>
        <Typography>This is where the schedule will be placed</Typography>
      </Card>
    </Sheet>
  );
};

export default Calendar;
