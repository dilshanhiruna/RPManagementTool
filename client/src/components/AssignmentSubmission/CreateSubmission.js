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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewSubmission() {
  const API = process.env.REACT_APP_API;
  const [sType, setsType] = useState("");
  const [submissionName, setsubmissionName] = useState("");
  const [sDescription, setsDescription] = useState("");
  const [sTemplate, setsTemplate] = useState();
  const [sMarkingScheme, setsMarkingScheme] = useState();
  const [sDeadline, setsDeadline] = useState("");
  const [sVisibility, setsVisibility] = useState(false);

  const [openAlert, setopenAlert] = useState(false);

  const sendNewSubmissionTypeToAPI = () => {
    Axios.post(`${API}/AssignmentSubmissions`, {
      submissionName,
      sType,
      sDescription,
      sDeadline,
      sTemplate,
      sMarkingScheme,
      sVisibility,
    })
      .then((res) => {
        setopenAlert(true);
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
              <MenuItem value={1}>Document</MenuItem>
              <MenuItem value={2}>Presentation</MenuItem>
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
              <MenuItem value={1}>Topic Assignment Form</MenuItem>
              <MenuItem value={2}>ProjectProposal</MenuItem>
              <MenuItem value={3}>Research Paper</MenuItem>
              <MenuItem value={4}>Final Paper</MenuItem>
              <MenuItem value={5}>Research LogBook</MenuItem>
              <MenuItem value={6}>Thesis</MenuItem>
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
                    // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                    setsTemplate(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Button variant="outlined" component="span">
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
                    // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                    setsMarkingScheme(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Button variant="outlined" component="span">
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
