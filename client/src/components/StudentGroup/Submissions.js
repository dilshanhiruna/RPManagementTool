import React, { useState } from "react";
import "./Submissions.css";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
export default function Submissions({ studentGroup }) {
  const [Group, setGroup] = useState(studentGroup);
  console.log(studentGroup);

  // Submission Types
  // TopicAssesmentForm
  // ProjectProposal & Presentation (ppt)
  // ResearchPaper
  // FinalPaper
  // ResearchLogBook
  // Thesis

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
      </div>
      <Box sx={{ maxWidth: 400 }}></Box>
    </div>
  );
}
