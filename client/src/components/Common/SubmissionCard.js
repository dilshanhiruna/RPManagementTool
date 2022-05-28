import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { color } from "@mui/system";
import Axios from "axios";
import "../AssignmentSubmission/ViewSubmission.css";
const API = process.env.REACT_APP_API_SUBMISSIONS;

export default function SubmissionCard({
  submissionName,
  sType,
  sDescription,
  sTemplate,
  sDeadline,
  sVisibility,
  sMarkingScheme,
  Activate,
  Deactivate,
  Update,
  Delete,
}) {
  let history = useHistory();

  const viewDetails = () => {
    // history.push({ pathname: '/customer/reservation', id });
  };

  //   const updateSubmission = () => {
  //     console.log("update...");
  //     history.push({ pathname: "/admin/movies/edit", movie });
  //   };
  //   const deleteSubmission = () => {
  //     const confirmation = window.confirm("Are you sure?");

  //     if (confirmation) {
  //       Axios.delete(`${API}api/v1/movies/${movie._id}`)
  //         .then((res) => {
  //           window.location.reload();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };
  return (
    <Card sx={{ maxWidth: 1350, marginTop: "30px", marginLeft: "80px" }}>
      <CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            style={{ width: "85px", marginLeft: "1100px" }}
            // onClick={}
          >
            {Activate}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            style={{ width: "85px" }}
            // onClick={}
          >
            {Deactivate}
          </Button>
        </CardActions>
        <Typography gutterBottom variant="h5" component="div">
          {submissionName}
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
          //   onClick={() => {
          //     updateMovie();
          //   }}
          style={{ marginLeft: "50px", color: "green" }}
        >
          {/* {btn3} */}
        </Button>
        <Button
          size="small"
          //   onClick={() => {
          //     deleteMovie();
          //   }}
          style={{ color: "red" }}
        >
          {/* {btn4} */}
        </Button>
      </CardActions>
    </Card>
  );
}
