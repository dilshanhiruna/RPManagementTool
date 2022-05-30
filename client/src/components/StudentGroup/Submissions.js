import React, { useState, useEffect } from "react";
import "./Submissions.css";
import Box from "@mui/material/Box";
import { Chip, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubmissionItem from "./SubmissionItem";
import { LinearProgress, CircularProgress } from "@mui/material";
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
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [fileIsLoadig, setFileIsLoading] = useState(true);

  // Submission Types
  // TopicAssesmentForm
  // ProjectProposal & Presentation (ppt)
  // ResearchPaper
  // FinalPaper
  // ResearchLogBook
  // Thesis

  // card to display active submission details from db
  const BasicCard = ({ submissionDetail }) => {
    return (
      <Card
        sx={{
          minWidth: 275,
          maxWidth: "98%",
          marginBottom: 0,
          backgroundColor: "#edf4fa",
        }}
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
          <Typography sx={{ fontSize: 12 }}>
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

  // function to get active submission details from db
  const getSubmissionDetails = async () => {
    try {
      const result = await axios.get(`${API}/AssignmentSubmissions/active`);
      setSubmissionDetails(result.data.data);
      setPageIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // function to get existing student sbmission from db
  const getExisitingStudentSubmissions = async (submissionDetailsId) => {
    try {
      const submissionObj = {
        submissionDetailsId,
        studentGroupId: studentGroup._id,
      };

      const result = await axios.post(
        `${API}/studentSubmission/getSpecific`,
        submissionObj
      );
      setExistingSubmission(result.data.data);
      // console.log("olaaaaaaa" + result.data.data);
      // setPageIsLoading(false);
    } catch (err) {
      console.error(err);
    }
    setFileIsLoading(false);
  };

  //function to confrim student submission and save in db
  const onSubmitConfirm = async (submissionDetailsId) => {
    try {
      setFileIsLoading(true);

      const submissionObj = {
        file: studentSubmission,
        submissionDetailsId,
        studentGroupId: studentGroup._id,
      };
      const result = await axios.post(
        `${API}/studentSubmission`,
        submissionObj
      );
      if (result.data.success) {
        alert("submission success");
        setOpenConfirmModal(false);
      } else {
        alert("error");
        setOpenConfirmModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //function to handle close of submission modal
  const handleModalClose = () => {
    setOpenConfirmModal(false);
    setFileIsLoading(true);
  };

  //function to handle open of submission modal
  const handleModalOpen = async (submissionDetail) => {
    setOpenConfirmModal(true);
    setSelectedSubmissionDetail(submissionDetail);
    await getExisitingStudentSubmissions(submissionDetail._id);
  };

  //function to upload file
  const onFileUpload = (file) => {
    setStudentSubmission(file);
    console.log(file);
  };

  //function to delete student submission from db
  const deleteStudentSubmission = async () => {
    setFileIsLoading(true);
    const id = existingSubmission._id;
    const result = await axios.delete(`${API}/studentSubmission/${id}`);
    setFileIsLoading(false);
    setExistingSubmission(null);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, []);
  return (
    <>
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
          <div style={{ maxHeight: 550, overflow: "auto" }}>
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
              sx={{
                minWidth: 700,
              }}
            >
              <DialogTitle id="alert-dialog-title">
                {selectedSubmissionDetail.submissionName}
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ marginBottom: 1 }}>
                  <Chip label={`${selectedSubmissionDetail.sType}`} />
                </DialogContentText>
                <DialogContentText>
                  <Chip
                    label={`Deadline: ${selectedSubmissionDetail.sDeadline}`}
                    color="warning"
                  />
                </DialogContentText>
                <br></br>
                <DialogContentText id="alert-dialog-description">
                  {selectedSubmissionDetail.sDescription}
                </DialogContentText>
              </DialogContent>

              <DialogContent className="centerItems" sx={{ minWidth: "550px" }}>
                {fileIsLoadig ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <div>
                    {existingSubmission ? (
                      <>
                        <Button
                          onClick={() => {
                            deleteStudentSubmission();
                          }}
                          color="error"
                          size="small"
                          variant="contained"
                        >
                          Remove
                        </Button>{" "}
                        {existingSubmission.file.name}
                      </>
                    ) : (
                      <FileBase64
                        multiple={false}
                        onDone={onFileUpload.bind()}
                      />
                    )}
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onSubmitConfirm(selectedSubmissionDetail._id);
                  }}
                  autoFocus
                  color="success"
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
