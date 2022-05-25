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
import { useHistory } from "react-router";
import UploadDocuments from "./UploadDocuments";

export default function CreateSubmission() {
  const [submissionName, setsubmissionName] = useState("");
  const [sType, setsType] = useState("");
  const [sDescription, setsDescription] = useState("");
  const [sDeadline, setsDeadline] = useState("");

  const API = process.env.REACT_APP_API;
  const history = useHistory();
  return (
    <div className="res_component">
      <div className="submission_details">
        <br />

        <div className="submission_details__input">
          <p>Name </p>

          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              className="submission_txt"
              label="Assignment Name"
              variant="outlined"
              onChange={(e) => setsubmissionName(e.target.value)}
            />
          </FormControl>
        </div>

        <div className="submission_details__input">
          <p>Assignment type </p>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={timeSlot}
              label="Type"
              onChange={(event) => {
                setsType(event.target.value);
              }}
              style={{ width: "350px" }}
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

        <div className="submission_details__input">
          <p>Description</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-static"
              label="Info"
              multiline
              rows={3}
              variant="outlined"
              style={{ width: "350px" }}
              onChange={(event) => {
                setsDescription(event.target.value);
              }}
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
              sx={{ width: 350 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setsDeadline(event.target.value);
              }}
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
              sx={{ left: "550px" }}
              onClick={() => history.push("/admin/uploadfiles")}
            >
              Next
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
