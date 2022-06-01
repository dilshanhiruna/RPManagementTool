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
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateSubmission() {
  const [sType, setsType] = useState("");
  const [submissionName, setsubmissionName] = useState("");
  const [sDescription, setsDescription] = useState("");
  const [sTemplate, setsTemplate] = useState();
  const [sMarkingScheme, setsMarkingScheme] = useState();
  const [sDeadline, setsDeadline] = useState("");
  const [sVisibility, setsVisibility] = useState(false);
  const [tempName, settempName] = useState("");
  const [markingName, setmarkingName] = useState("");

  const [openAlert, setopenAlert] = useState(false);
  const API = process.env.REACT_APP_API;
  let history = useHistory();

  const sendNewSubmissionTypeToAPI = () => {
    const tempobj = {
      file: sTemplate,
      name: tempName,
    };
    const markingobj = {
      file: sMarkingScheme,
      name: markingName,
    };
    Axios.post(`${API}/AssignmentSubmissions`, {
      submissionName,
      sType,
      sDescription,
      sDeadline,
      sTemplate: tempobj,
      sMarkingScheme: markingobj,
      sVisibility,
    })
      .then((res) => {
        setopenAlert(true);
        history.push("/admin/getAllSubmissions");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenAlert(false);
  };

  return (
    <div>
      <div className="createsubmission__form">
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
              style={{ width: "350px" }}
            >
              <MenuItem value={"Document"}>Document</MenuItem>
              <MenuItem value={"Presentation"}>Presentation</MenuItem>
              <MenuItem value={"Topic"}>Topic</MenuItem>
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
              label="Category"
              onChange={(event) => {
                setsubmissionName(event.target.value);
              }}
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
                //accept="image/*"
                onChange={(event) => {
                  // Get a reference to the file
                  const file = event.target.files[0];

                  settempName(event.target.files[0].name);
                  console.log(tempName);
                  // Encode the file using the FileReader API
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                    setsTemplate(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  variant="outlined"
                  component="span"
                  style={{ width: "80px", height: "37px" }}
                >
                  Upload
                </Button>
                <h5 style={{ marginLeft: "15px" }}>{tempName}</h5>
              </div>
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
                  const fileM = event.target.files[0];
                  setmarkingName(event.target.files[0].name);
                  console.log(markingName);
                  // Encode the file using the FileReader API
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                    setsMarkingScheme(reader.result);
                  };
                  reader.readAsDataURL(fileM);
                }}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  variant="outlined"
                  component="span"
                  style={{ width: "80px", height: "37px" }}
                >
                  Upload
                </Button>
                <h5 style={{ marginLeft: "15px" }}>{markingName}</h5>
              </div>
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
            />
          </FormControl>
        </div>

        <div className="Btn">
          <div>
            <FormControl fullWidth>
              <Button
                variant="contained"
                size="large"
                style={{
                  height: "60px",
                  width: "200px",
                  borderRadius: "40px",
                  marginTop: "35px",
                }}
                onClick={sendNewSubmissionTypeToAPI}
              >
                Create Submission
              </Button>
            </FormControl>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Submission created successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
