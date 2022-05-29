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
import { LinearProgress } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import FileBase64 from "react-file-base64";

const API = process.env.REACT_APP_API;
import axios from "axios";
export default function Submissions({ studentGroup }) {
  const [Group, setGroup] = useState(studentGroup);
  const [submissionDetails, setSubmissionDetails] = useState([]);
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedSubmissionDetail, setSelectedSubmissionDetail] =
    useState(false);
  const [studentSubmission, setStudentSubmission] = useState({});

  // Submission Types
  // TopicAssesmentForm
  // ProjectProposal & Presentation (ppt)
  // ResearchPaper
  // FinalPaper
  // ResearchLogBook
  // Thesis

  const BasicCard = ({ submissionDetail }) => {
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
            {submissionDetail.submissionName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="grey">
            {submissionDetail.sType}
          </Typography>
          <Typography sx={{ fontSize: 12 }} gutterBottom>
            {submissionDetail.sDeadline}
          </Typography>
          <Typography variant="body2">
            {submissionDetail.sDescription}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleModalOpen(submissionDetail);
            }}
          >
            Submit
          </Button>
          <Button size="small" variant="text">
            Template
          </Button>
          <Button size="small" variant="text">
            Marking
          </Button>
        </CardActions>
      </Card>
    );
  };

  const getSubmissionDetails = async () => {
    try {
      const result = await axios.get(`${API}/AssignmentSubmissions/active`);
      console.log(result.data.data);
      setSubmissionDetails(result.data.data);
      setPageIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setOpenConfirmModal(false);
  };

  const handleModalOpen = (submissionDetail) => {
    setOpenConfirmModal(true);
    setSelectedSubmissionDetail(submissionDetail);
  };

  const onFileUpload = (file) => {
    setStudentSubmission({ file });
    console.log(file);
  };

  const onSubmitConfirm = async () => {
    try {
      const result = await axios.post(`${API}/`, studentSubmission);
      if (result.data.success) {
        alert("submission success");
      } else {
        alert("error");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSubmissionDetails();
  }, []);
  return (
    <>
      {" "}
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
          <div className="student__dashboard">
            {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
          </div>
          <div style={{ maxHeight: 600, overflow: "auto" }}>
            {submissionDetails.map((submissionDetail) => {
              return (
                <>
                  <BasicCard submissionDetail={submissionDetail} />

                  <br></br>
                </>
              );
            })}
            <Dialog
              open={openConfirmModal}
              // onClose={handleCloseRemoveMember}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {selectedSubmissionDetail.submissionName}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {selectedSubmissionDetail.sDescription}
                </DialogContentText>
              </DialogContent>
              <DialogContent className="centerItems">
                <FileBase64 multiple={false} onDone={onFileUpload.bind()} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  // onClick={() => {
                  //   acceptOrReject();
                  // }}
                  autoFocus
                  color="error"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <Box sx={{ maxWidth: 400 }}></Box>
      </div>
    </>
  );
}
