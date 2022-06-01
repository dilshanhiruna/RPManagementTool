import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import "../AssignmentSubmission/ViewSubmission.css";
const API = process.env.REACT_APP_API;
import { useHistory } from "react-router";

export default function SubmissionCard({
  submissionName,
  sType,
  sDescription,
  sTemplate,
  sDeadline,
  sVisibility,
  sMarkingScheme,
  changeVisibility,
  id,
  btn1,
  btn2,
}) {
  console.log(sVisibility);

  let history = useHistory();

  const viewDetails = () => {
    console.log("viewdeatils");
    history.push("/admin/getAllSubmissions");
  };

  //get all theaters from the database
  const getAllSubmissions = () => {
    Axios.get(`${API}/AssignmentSubmissions/`).then((res) => {
      setsubmissions(res.data.data);
      console.log(res.data.data);
    });
  };

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

  const DeleteSubmission = (id) => {
    console.log("delete.....");
    console.log(id);
    Axios.delete(`${API}/AssignmentSubmissions/${id}`).then((res) => {
      alert("success");
      getAllSubmissions();
    });
  };
  return (
    <Card
      sx={{
        maxWidth: 1350,
        marginTop: "25px",
        marginLeft: "80px",
        backgroundColor: "#edf4fa",
      }}
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
          {sDeadline}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {sDescription}
        </Typography>
      </CardContent>
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
          onClick={() => {
            DeleteSubmission(id);
          }}
        >
          {btn2}
        </Button>
      </CardActions>
    </Card>
  );
}
