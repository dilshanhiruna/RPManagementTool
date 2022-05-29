import React, { useState, useEffect } from "react";
import "./Submissions.css";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

  const BasicCard = (name, type, dl, desc, sub, temp) => {
    return (
      <Card
        sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "#edf4fa" }}
        elevation="4"
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            color="text.secondary"
            gutterBottom
          >
            Topic Assesment Form
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="grey">
            Document
          </Typography>
          <Typography sx={{ fontSize: 12 }} gutterBottom>
            Deadline: 20/10/2020
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            possimus minus optio aliquid beatae eum exercitationem sequi iusto.
            Hic rem doloremque dolore quas pariatur sequi excepturi, nam fuga
            beatae eligendi!
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            Submit
          </Button>
          <Button size="small" variant="outlined">
            Download Template
          </Button>
        </CardActions>
      </Card>
    );
  };

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
            ? " " +
              studentGroup.supervisor?.uid +
              " - " +
              studentGroup.supervisor?.name
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
            ? " " +
              studentGroup.cosupervisor?.uid +
              " - " +
              studentGroup.cosupervisor?.name
            : "Not Assigned"}{" "}
          (
          {studentGroup.cosupervisorStatus !== "none"
            ? studentGroup.cosupervisorStatus
            : ""}
          )
        </h4>

        <Divider />

        <h1>Group Submissions</h1>
        <BasicCard />
        {submissionDetails.map((submissionDetail) => {
          return (
            <>
              {/* <SubmissionItem submission={submissionDetail} /> */}
              {/* <Divider /> */}
            </>
          );
        })}
      </div>
      <Box sx={{ maxWidth: 400 }}></Box>
    </div>
  );
}
