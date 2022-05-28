import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { color } from "@mui/system";
import Axios from "axios";
import "../AssignmentSubmission/ViewSubmission.css";
import Swal from "sweetalert2";
const API = process.env.REACT_APP_API_SUBMISSIONS;

export default function SubmissionCard({
  submissionName,
  sType,
  sDescription,
  sTemplate,
  sDeadline,
  sVisibility,
  sMarkingScheme,
  key,
  btn1,
  btn2,
}) {
  const handleChange = (event) => {
    setsVisibility(event.target.sVisibility);
  };

  let history = useHistory();

  //   const viewDetails = () => {
  //     history.push({ pathname: '/customer/reservation', id });
  //   };

  //   const updateSubmission = () => {
  //     console.log("update...");
  //     history.push({ pathname: "/admin/movies/edit", movie });
  //   };
  const Delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${API}/AssignmentSubmissions/${id}`).then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          getAllSubmissions();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
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
            checked={sVisibility}
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
          style={{ width: "85px", marginLeft: "1150px" }}
          // onClick={}
        >
          {btn1}
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          style={{ width: "85px" }}
          onClick={() => {
            Delete(key);
          }}
        >
          {btn2}
        </Button>
      </CardActions>
    </Card>
  );
}
