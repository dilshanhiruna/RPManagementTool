import React, { useState, useEffect } from "react";
import "./Submissions.css";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import SubmissionItem from "./SubmissionItem";
const API = process.env.REACT_APP_API;
import axios from "axios";
export default function Submissions({ studentGroup }) {
  const [Group, setGroup] = useState(studentGroup);
  const [submissionDetails, setSubmissionDetails] = useState([]);
  // Submission Types
  // TopicAssesmentForm
  // ProjectProposal & Presentation (ppt)
  // ResearchPaper
  // FinalPaper
  // ResearchLogBook
  // Thesis

  const getSubmissionDetails = async () => {
    try {
      const result = await axios.get(`${API}/AssignmentSubmissions/active`);
      setSubmissionDetails(result.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSubmissionDetails();
  }, []);
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <h4>Group ID: {studentGroup.groupID} </h4>
        <h4>Topic: {studentGroup.researchTopic}</h4>
        <h4>
          Supervisor :
          {studentGroup.supervisor?.name
            ? studentGroup.supervisor?.name
            : "Not Assigned"}{" "}
          (
          {studentGroup.supervisorStatus !== "none"
            ? studentGroup.supervisorStatus
            : ""}
          )
        </h4>
        <h4>
          Co-Supervisor :
          {studentGroup.cosupervisor?.name
            ? studentGroup.cosupervisor?.name
            : "Not Assigned"}{" "}
          (
          {studentGroup.cosupervisorStatus !== "none"
            ? studentGroup.cosupervisorStatus
            : ""}
          )
        </h4>

        <Divider />

        <h1>Group Submissions</h1>
        {submissionDetails.map((submissionDetail) => {
          return (
            <>
              <SubmissionItem submission={submissionDetail} />
              <Divider />
            </>
          );
        })}
      </div>
      <Box sx={{ maxWidth: 400 }}></Box>
    </div>
  );
}
