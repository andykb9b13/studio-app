import React, { useState } from "react";
import { Card, Sheet, Typography } from "@mui/joy";
import { DateCalendar } from "@mui/x-date-pickers";

const Calendar = () => {
  const [value, setValue] = useState(null);
  console.log("This is the value", value);

  return (
    <Sheet>
      <Card>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Card>
      <Card>
        <Typography>This is where the schedule will be placed</Typography>
        {value && <Typography>{value.$d}</Typography>}
      </Card>
    </Sheet>
  );
};

export default Calendar;
