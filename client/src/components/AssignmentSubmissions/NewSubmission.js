import React, { useState } from "react";
import "./NewSubmission.css";
import { useState } from "react";
import {
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import FileUpload from "react-material-file-upload";

export default function NewSubmission() {
  const [sType, setsType] = useState("");
  const [submissionName, setsubmissionName] = useState("");
  const [sDescription, setsDescription] = useState("");
  const [sTemplate, setsTemplate] = useState();
  const [sMarkingScheme, setsMarkingScheme] = useState();
  const [sDeadline, setsDeadline] = useState("");
  const [sVisibility, setsVisibility] = useState(false);

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
              label="Type"
              onChange={(event) => {
                setsubmissionName(event.target.value);
              }}
              size="small"
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

        <div style={{ width: "760px" }}>
          <p>Upload Template</p>
          <FileUpload value={sTemplate} onChange={setsTemplate} />
        </div>

        <div style={{ width: "760px" }}>
          <p>Upload Marking Scheme</p>
          <FileUpload value={sMarkingScheme} onChange={setsMarkingScheme} />
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
              <Button variant="outlined" style={{ width: "350px" }}>
                Create Submission
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
