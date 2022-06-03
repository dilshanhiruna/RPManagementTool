import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { useHistory } from "react-router";
import { triggerBase64Download } from "common-base64-downloader-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { Snackbar } from "@mui/material";

import "../AssignmentSubmission/Submissioncard.css";
import "../AssignmentSubmission/ViewSubmission.css";
const API = process.env.REACT_APP_API;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SubmissionCard({
  submissionName,
  sType,
  sDescription,
  sTemplate,
  sDeadline,
  sVisibility,
  sMarkingScheme,
  changeVisibility,
  getAllSubmissions,
  id,
  btn1,
  btn2,
}) {
  console.log(sVisibility);
  const [open, setOpen] = React.useState(false);
  const [opendownload, setOpendownload] = React.useState(false);
  const [opendownloadx, setOpendownloadx] = React.useState(false);
  const [openAlert, setopenAlert] = useState(false);
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadhandleClickOpen = () => {
    setOpendownload(true);
  };

  const downloadhandleClose = () => {
    setOpendownload(false);
  };

  const downloadhandleClickOpenx = () => {
    setOpendownloadx(true);
  };

  const downloadhandleClosex = () => {
    setOpendownloadx(false);
  };

  //view detials
  const viewDetails = () => {
    console.log("viewdeatils");
    history.push("/admin/getAllSubmissions");
  };

  //pass data to update componenet
  const updateSubmission = () => {
    console.log(id);
    history.push({
      pathname: `/admin/updatesubmission`,
      submissionName,
      sType,
      sDescription,
      sTemplate,
      sDeadline,
      sVisibility,
      sMarkingScheme,
      id,
    });
  };

  //delete submission function
  const DeleteSubmission = (id) => {
    console.log("delete.....");
    Axios.delete(`${API}/AssignmentSubmissions/${id}`).then((res) => {
      setopenAlert(true);
      handleClose();
      getAllSubmissions();
    });
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenAlert(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 1350,
        marginTop: "25px",
        marginLeft: "80px",
        backgroundColor: "white",
      }}
      data-testid="629876365a605575e4d0d63a"
    >
      <CardContent>
        <CardActions>
          <Typography gutterBottom variant="h5" component="div">
            {submissionName}
          </Typography>
          <Switch
            checked={sVisibility}
            onChange={(e) => {
              changeVisibility(e, id);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        </CardActions>
        <Typography variant="body2" color="red" style={{ textAlign: "left" }}>
          {new Date(sDeadline).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {sDescription}
        </Typography>
      </CardContent>

      <div className="file_download">
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="success"
            style={{ width: "85px" }}
            onClick={() => {
              if (sTemplate.name == "") {
                downloadhandleClickOpenx();
              } else {
                triggerBase64Download(
                  sTemplate.file,
                  `${submissionName} template`
                );
              }
            }}
          >
            Template
          </Button>
          <Dialog
            open={opendownloadx}
            onClose={downloadhandleClosex}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Submission template Not Found"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Still not uploaded the Submission template
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={downloadhandleClosex}>Close</Button>
            </DialogActions>
          </Dialog>
          <Button
            size="small"
            variant="outlined"
            color="success"
            style={{ width: "85px" }}
            onClick={() => {
              if (sMarkingScheme.name == "") {
                downloadhandleClickOpen();
              } else {
                triggerBase64Download(
                  sMarkingScheme.file,
                  `${submissionName} marking`
                );
              }
            }}
          >
            Marking
          </Button>
          <Dialog
            open={opendownload}
            onClose={downloadhandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Marking Rubric Not Found"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Still not uploaded the Marking rubric
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={downloadhandleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </CardActions>

        <CardActions>
          <Button
            size="small"
            variant="outlined"
            style={{ width: "85px" }}
            onClick={() => {
              updateSubmission();
            }}
          >
            {btn1}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            style={{ width: "85px" }}
            onClick={handleClickOpen}
          >
            {btn2}
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You won't be able to revert this submission type
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                color="error"
                onClick={() => {
                  DeleteSubmission(id);
                }}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleAlertClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Submission type deleted successfully!
            </Alert>
          </Snackbar>
        </CardActions>
      </div>
    </Card>
  );
}
