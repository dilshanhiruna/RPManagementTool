import React, { useState, useEffect, useCallback } from "react";
import "./Submissions.css";
import axios from "axios";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  styled,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import "./Submissions.css";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { triggerBase64Download } from "common-base64-downloader-react";
import { useDropzone } from "react-dropzone";
import styledComponents from "styled-components";
import MuiAlert from "@mui/material/Alert";

//alert fot snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const API = process.env.REACT_APP_API;

//colors for dropzone
const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

//styles for dropzone
const Container = styledComponents.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default function Submissions({ studentGroup }) {
  const [Group, setGroup] = useState(studentGroup);
  const [submissionDetails, setSubmissionDetails] = useState([]);
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedSubmissionDetail, setSelectedSubmissionDetail] =
    useState(false);
  const [studentSubmission, setStudentSubmission] = useState({});
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [existingSubmissionName, setExistingSubmissionName] = useState(null);

  const [base64File, setBase64File] = useState();
  const [fileIsLoadig, setFileIsLoading] = useState(true);
  const [viewFeedbackModal, setviewFeedbackModal] = useState(false);

  //for confirmation snackbar
  const [openAlert, setopenAlert] = useState(false);
  const [showErrorr, setshowErrorr] = useState(false);
  //new styled dropzone component
  function StyledDropzone(props) {
    let submissionObject = {
      name: "",
      base64: "",
    };

    //callback function to handle dropzone inputs
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      submissionObject.name = file.name;

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        submissionObject.base64 = reader.result;
      };
      reader.readAsDataURL(file);
      setStudentSubmission(submissionObject);
      setExistingSubmissionName(submissionObject.name);
    }, []);
    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      // accept: {
      //   "application/pdf": [],
      // },
      onDrop,
    });

    return (
      <div className="container">
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </Container>
      </div>
    );
  }

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
            {formatDate(submissionDetail.sDeadline)}
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
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              triggerBase64Download(
                submissionDetail.sTemplate.file,
                `${submissionDetail.submissionName} template`
              );
            }}
          >
            Template
          </Button>
          {/* <Button
            size="small"
            variant="text"
            onClick={() => {
              triggerBase64Download(
                submissionDetail.sMarkingScheme.file,
                `${submissionDetail.submissionName} marking scheme`
              );
            }}
          >
            Marking
          </Button> */}
        </CardActions>
      </Card>
    );
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
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
      if (result.data.data) {
        setBase64File(result.data.data.file.base64);
        setExistingSubmissionName(result.data.data.file.name);
      }
    } catch (err) {
      console.error(err);
    }
    setFileIsLoading(false);
  };

  //function to confrim student submission and save in db
  const onSubmitConfirm = async (submissionDetailsId) => {
    try {
      setFileIsLoading(true);
      setExistingSubmissionName(false);

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
        // alert("submission success");
        setopenAlert(true);
        setshowErrorr(false);

        setOpenConfirmModal(false);
      } else {
        // alert("error");
        setopenAlert(true);
        setshowErrorr(true);

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
    setExistingSubmissionName(false);
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
  };

  //function to delete student submission from db
  const deleteStudentSubmission = async () => {
    setFileIsLoading(true);
    if (existingSubmission) {
      const id = existingSubmission._id;
      const result = await axios.delete(`${API}/studentSubmission/${id}`);
    }
    setFileIsLoading(false);
    setExistingSubmission(null);
    setExistingSubmissionName(null);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, []);

  const openViewFeedbackModal = (submissionDetail) => {
    if (viewFeedbackModal) {
      setviewFeedbackModal(false);
    } else {
      setviewFeedbackModal(true);
    }
  };

  //function to close confirmation snackbar
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenAlert(false);
  };

  //function to format js date
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  return (
    <>
      <div>
        <div style={{ textAlign: "left" }}>
          <h4>Group ID: {studentGroup.groupID}</h4>
          <h4>
            Topic: {studentGroup.researchTopic}
            {studentGroup.topicFeedback &&
            studentGroup.topicFeedback?.approveOrReject === "Approved" ? (
              <>
                <CheckCircleOutlineRoundedIcon
                  color="success"
                  sx={{
                    fontSize: "15px",
                    marginLeft: 1,
                    position: "relative",
                    top: 3,
                  }}
                />
                <Chip
                  label="View Feedback"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    openViewFeedbackModal();
                  }}
                />
              </>
            ) : (
              ""
            )}
            {studentGroup.topicFeedback &&
            studentGroup.topicFeedback?.approveOrReject === "Rejected" ? (
              <>
                <ErrorOutlineRoundedIcon
                  color="error"
                  sx={{
                    fontSize: "15px",
                    marginLeft: 1,
                    position: "relative",
                    top: 3,
                  }}
                />
                <Chip
                  label="View Feedback"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    openViewFeedbackModal();
                  }}
                />
              </>
            ) : (
              ""
            )}
          </h4>
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
                  <Chip label={`Type: ${selectedSubmissionDetail.sType}`} />
                  <Chip
                    label={`Deadline: ${formatDate(
                      selectedSubmissionDetail.sDeadline
                    )}`}
                    color="warning"
                    style={{ marginLeft: "15px" }}
                  />
                </DialogContentText>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ padding: "5px" }}
                >
                  {selectedSubmissionDetail.sDescription}
                </DialogContentText>
              </DialogContent>

              <DialogContent
                className="centerItems"
                sx={{ minWidth: "550px", paddingTop: 0 }}
              >
                {fileIsLoadig ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <div>
                    {existingSubmissionName ? (
                      <>
                        <Tooltip title="Submission will be deleted permanently">
                          <Button
                            onClick={() => {
                              deleteStudentSubmission();
                            }}
                            color="error"
                            size="small"
                            variant="contained"
                          >
                            Remove
                          </Button>
                        </Tooltip>
                        <Button
                          style={{ textTransform: "none" }}
                          onClick={() => {
                            triggerBase64Download(
                              base64File,
                              existingSubmissionName
                            );
                          }}
                        >
                          {existingSubmissionName}
                        </Button>
                      </>
                    ) : (
                      <StyledDropzone />
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

            <BootstrapDialog
              onClose={openViewFeedbackModal}
              aria-labelledby="customized-dialog-title"
              open={viewFeedbackModal}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={openViewFeedbackModal}
              >
                Topic Feedback - ({studentGroup.topicFeedback?.approveOrReject})
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Typography sx={{ minWidth: 400 }} gutterBottom>
                  {studentGroup.topicFeedback?.feedback}
                </Typography>
              </DialogContent>
            </BootstrapDialog>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
        >
          {showErrorr ? (
            <Alert severity="error" sx={{ width: "100%" }}>
              Error Ocuured!
            </Alert>
          ) : (
            <Alert severity="success" sx={{ width: "100%" }}>
              Submission success!
            </Alert>
          )}
        </Snackbar>
        <Box sx={{ maxWidth: 400 }}></Box>
      </div>
    </>
  );
}
