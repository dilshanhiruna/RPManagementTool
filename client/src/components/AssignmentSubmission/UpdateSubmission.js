import React, { useState } from "react";
import "./CreateSubmission.css";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import {
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Input,
} from "@mui/material";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

export default function UpdateSubmission() {
  const [sType, setsType] = useState("");
  const [submissionName, setsubmissionName] = useState("");
  const [sDescription, setsDescription] = useState("");
  const [sTemplate, setsTemplate] = useState();
  const [sMarkingScheme, setsMarkingScheme] = useState();
  const [sDeadline, setsDeadline] = useState("");
  const [sVisibility, setsVisibility] = useState(false);
  const API = process.env.REACT_APP_API_SUBMISSIONS;
  const history = useHistory();
  //   id = useParams();

  const updateSubmissionTypeToAPI = () => {
    const data = {
      sDescription,
      sTemplate,
      sMarkingScheme,
      sDeadline,
      sVisibility,
    };
    //update theater details
    Axios.put(`${API}/AssignmentSubmissions/${id}`, data).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/getAllSubmissions");
    });
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <div>
      <div className="form">
        <div>
          <p>Submission Type </p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sType}
              label="Type"
              onChange={(event) => {
                setsType(event.target.value);
              }}
              size="small"
              style={{ width: "350px" }}
            >
              <MenuItem value={"Document"}>Document</MenuItem>
              <MenuItem value={"Presentation"}>Presentation</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <p>Category </p>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={submissionName}
              label="Type"
              onChange={(event) => {
                setsubmissionName(event.target.value);
              }}
              size="small"
              style={{ width: "350px" }}
            >
              <MenuItem value={"Topic Assignment Form"}>
                Topic Assignment Form
              </MenuItem>
              <MenuItem value={"Project Proposal"}>Project Proposal</MenuItem>
              <MenuItem value={"Research Paper"}>Research Paper</MenuItem>
              <MenuItem value={"Final Paper"}>Final Paper</MenuItem>
              <MenuItem value={"Research LogBook"}>Research LogBook</MenuItem>
              <MenuItem value={"Thesis"}>Thesis</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="form_feilds_col">
        <div>
          <p>Description</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-static"
              label="Info"
              multiline
              rows={2}
              variant="outlined"
              style={{ width: "760px" }}
              value={sDescription}
              onChange={(event) => {
                setsDescription(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="form">
          <div style={{ width: "380px" }}>
            <p>Upload Template</p>
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                type="file"
                onChange={(event) => {
                  // Get a reference to the file
                  const file = event.target.files[0];

                  // Encode the file using the FileReader API
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    console.log(reader.result);
                    // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                    setsTemplate(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </div>

          <div style={{ width: "380px" }}>
            <p>Upload Marking Scheme</p>
            <label htmlFor="contained-ms-button-file">
              <Input
                id="contained-ms-button-file"
                type="file"
                onChange={(event) => {
                  // Get a reference to the file
                  const file = event.target.files[0];

                  // Encode the file using the FileReader API
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    console.log(reader.result);
                    // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                    setsMarkingScheme(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </div>
        </div>
        <div className="dat">
          <p>Deadline</p>
          <FormControl fullWidth>
            <TextField
              id="date"
              label="Date"
              type="date"
              value={sDeadline}
              sx={{ width: 350 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setsDeadline(event.target.value);
              }}
              size="small"
            />
          </FormControl>
        </div>

        <div className="Btn">
          <div>
            <FormControl fullWidth>
              <Button
                variant="outlined"
                style={{ width: "350px" }}
                onClick={updateSubmissionTypeToAPI}
              >
                Update Submission
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}