import React from "react";
import { Grid, Button } from "@mui/material";
import SubmissionDetails from "./SubmissionDetails";
import { useHistory } from "react-router-dom";
export default function SubmissionItem({ submission }) {
  const history = useHistory();
  const viewSubmissionDetails = (submission) => {
    console.log("in viewSubmissionDetails method");
    history.push({ pathname: "/student/submissionDetails", submission });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="text"
            onClick={() => {
              viewSubmissionDetails(submission);
            }}
          >
            {submission.submissionName}
          </Button>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "8px" }}>
          <div>{submission.sType}</div>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "8px" }}>
          <div>{submission.sDeadline}</div>
        </Grid>
      </Grid>
    </>
  );
}
