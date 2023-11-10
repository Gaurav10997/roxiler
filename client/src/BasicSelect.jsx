import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
];

// eslint-disable-next-line react/prop-types
export default function BasicSelect({ handleMonth }) {
  const [month, setMonth] = React.useState("MARCH");

  const handleChange = (event) => {
    setMonth(event.target.value);
    handleMonth(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="jkj"
          onChange={handleChange}
        >
          {months.map((month, index) => {
            return (
              <MenuItem value={month} key={index}>
                {month}{" "}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
