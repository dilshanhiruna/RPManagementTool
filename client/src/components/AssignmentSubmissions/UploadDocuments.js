import React from "react";
import "../../App.css";
import "./UploadDocuments.css";
import CreateSubmission from "./CreateSubmission";
import React, { useEffect, useState } from "react";
import FileUpload from "react-material-file-upload";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";

export default function UploadDocuments() {
  const [sTemplate, setsTemplate] = useState();
  const [sMarkingScheme, setsMarkingScheme] = useState();
  const [sVisibility, setsVisibility] = useState(false);

  const history = useHistory();

  //using axios send theater details to api
  const sendNewSubmissionTypeToAPI = () => {
    Axios.post(`${API}api/v1/submission`, {
      submissionName,
      sType,
      sDescription,
      sDeadline,
      sTemplate,
      sMarkingScheme,
      sVisibility,
    }).then((res) => {});
  };

  return (
    <div className="res_component">
      <div className="submission_details">
        <h2>Upload the document template :</h2>
        <div>
          <FileUpload value={sTemplate} onChange={setsTemplate} />
        </div>
        <br />
        <h2>Upload the Marking Rubric :</h2>
        <div>
          <FileUpload value={sMarkingScheme} onChange={setsMarkingScheme} />
        </div>
        <br />
        <Button
          variant="outline"
          style={{ width: "100px" }}
          onClick={() => history.push("/admin/add")}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          style={{ width: "100px" }}
          sx={{ left: "720px" }}
          onClick={sendNewSubmissionTypeToAPI}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
