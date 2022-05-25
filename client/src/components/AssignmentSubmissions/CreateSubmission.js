import * as React from "react";
import "./CreateSubmission.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// import { Typography } from "@material-ui/core";

export default function CreateSubmission() {
  // const theme = createTheme({
  //   typography: {
  //     fontFamily: [
  //       "Nunito",
  //       "Roboto",
  //       "Helvetica Neue",
  //       "Arial",
  //       "sans-serif",
  //     ].join(","),
  //   },
  // });
  const [date, setdate] = useState("2022-06-01");
  return (
    <div className="res_component">
      {/* <ThemeProvider theme={theme}>
        <Typography variant="h3">hello world</Typography> */}

      <div className="submission_details">
        <br />

        <div className="submission_details__input">
          <p>Name : </p>

          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              className="submission_txt"
              label="Assignment Name"
              variant="outlined"
              // size="small"
              // onChange={(e) => setsubmissionname(e.target.value)}
            />
          </FormControl>
        </div>

        <div className="submission_details__input">
          <p>Assignment type :</p>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={timeSlot}
              label="Type"
              // onChange={(event) => {
              //   settimeSlot(event.target.value);
              // }}
              style={{ width: "330px" }}
            >
              <MenuItem value={1}>Topic Assignment Form</MenuItem>
              <MenuItem value={2}>Chater</MenuItem>
              <MenuItem value={3}>ProjectProposal</MenuItem>
              <MenuItem value={4}>Research Paper</MenuItem>
              <MenuItem value={5}>Final Paper</MenuItem>
              <MenuItem value={6}>Research LogBook</MenuItem>
              <MenuItem value={7}>Thesis</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* <div className="submission_details__input">
          <p>Description : </p>

          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              className="submission_txt"
              label="Description"
              variant="outlined"
              // size="small"
              // onChange={(e) => setsubmissionname(e.target.value)}
            />
          </FormControl>
        </div> */}

        <div className="submission_details__input">
          <p>Description : </p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-static"
              label="Info"
              multiline
              rows={3}
              variant="outlined"
              style={{ width: "330px" }}
            />
          </FormControl>
        </div>
        <div className="submission_details__input">
          <p>Deadline</p>
          <FormControl fullWidth>
            <TextField
              id="date"
              label="Date"
              type="date"
              // defaultValue={date}
              sx={{ width: 330 }}
              InputLabelProps={{
                shrink: true,
              }}
              // onChange={(event) => {
              //   setdate(event.target.value);
              // }}
            />
          </FormControl>
        </div>

        <div className="res_details__input">
          {/* <FormControl fullWidth>
            <Button
              variant="contained"
              style={{
                width: "500px",
                height: "45px",
                marginLeft: "120px",
                marginTop: "30px",
              }}
              // onClick={sendsubmissionToAPI}
            >
              Next
            </Button>
          </FormControl> */}
          <FormControl fullWidth>
            <Button
              variant="contained"
              style={{ width: "100px" }}
              sx={{ left: "795px" }}
            >
              Next
            </Button>
          </FormControl>
        </div>
      </div>
      {/* </ThemeProvider> */}
    </div>
  );
}
