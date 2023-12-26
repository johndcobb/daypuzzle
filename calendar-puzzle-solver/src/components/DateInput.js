import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
const DateInput = ({
  currentMonth = 12,
  currentDay = 22,
  solveClickHandler = () => {},
  changeMonthHandler = () => {},
  changeDayHandler = () => {},
}) => {
  return (
    <div className="date-input">
      <h1>Select a month and day to solve the calendar puzzle!</h1>

      <FormControl sx={{ marginRight: "1rem" }}>
        <InputLabel id="month-select-label">Month</InputLabel>
        <Select
          labelId="month-select-label"
          value={currentMonth}
          label="Month"
          id="month"
          onChange={changeMonthHandler}
        >
          {Array.from(Array(12).keys()).map((month, m) => {
            return (
              <MenuItem key={m} value={month + 1}>
                {month + 1}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ marginRight: "1rem" }}>
        <InputLabel id="day-select-label">Day</InputLabel>
        <Select
          labelId="day-select-label"
          value={currentDay}
          label="Day"
          id="day"
          onChange={changeDayHandler}
        >
          {Array.from(Array(31).keys()).map((day, d) => {
            return (
              <MenuItem key={d} value={day + 1}>
                {day + 1}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <Button
          sx={{ padding: "1rem" }}
          variant="contained"
          onClick={solveClickHandler}
        >
          Solve
        </Button>
      </FormControl>
    </div>
  );
};

export default DateInput;
