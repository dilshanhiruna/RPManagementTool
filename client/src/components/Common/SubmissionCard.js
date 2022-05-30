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
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

export default function SubmissionCard({
  submissionName,
  sType,
  sDescription,
  sTemplate,
  sDeadline,
  sVisibility,
  sMarkingScheme,
  id,
  btn1,
  btn2,
}) {
  const handleChange = (event) => {
    setsVisibility(event.target.sVisibility);
  };

  let history = useHistory();
  // id = useParams();
  //   const viewDetails = () => {
  //     history.push({ pathname: '/customer/reservation', id });
  //   };

  // const updateSubmission = (id) => {
  //   console.log("update...");
  //   console.log(id);
  //   history.push({ pathname: `/admin/updatesubmission/${id}` });
  // };

  const updateSubmission = (id) => {
    console.log("update...");
    console.log(id);
    history.push({
      pathname: `/admin/updatesubmission/`,
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
    });
  };
  return (
    <Card sx={{ maxWidth: 1350, marginTop: "30px", marginLeft: "80px" }}>
      <CardContent>
        <CardActions>
          <Typography gutterBottom variant="h5" component="div">
            {submissionName}
          </Typography>
          <Switch
            // checked={sVisibility}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </CardActions>

        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {sDescription}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {sTemplate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          style={{ width: "85px" }}
          onClick={() => {
            updateSubmission(id);
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
