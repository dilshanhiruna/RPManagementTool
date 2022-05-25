import React, { useState } from "react";
import "./Submissions.css";
import Box from "@mui/material/Box";
export default function Submissions({ studentGroup }) {
  const [Group, setGroup] = useState(studentGroup);

  // Submission Types
  // TopicAssesmentForm
  // ProjectProposal & Presentation (ppt)
  // ResearchPaper
  // FinalPaper
  // ResearchLogBook
  // Thesis

  return (
    <div>
      <Box sx={{ maxWidth: 400 }}>
        <h1 style={{ marginLeft: "-150px" }}>Group Submissions</h1>
      </Box>
    </div>
  );
}
