import React from "react";
import "./NewStudentMenu.css";
import MediaCard from "../Common/MediaCard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";

export default function NewStudentMenu() {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="newstudent__dashboard">
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="250"
            image={require("../../assets/images/createGroup.png")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {"Create Group"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: "left" }}
            >
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              onClick={() => history.push("/student/creategroup")}
            >
              {"Create"}
            </Button>
          </CardActions>
        </Card>
      </div>
      <div style={{ marginLeft: "30px" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="250"
            image={require("../../assets/images/joinGroup.png")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {"Join Group"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: "left" }}
            >
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
              {"Join"}
            </Button>
          </CardActions>
        </Card>
      </div>
      <div style={{ marginLeft: "30px" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="250"
            image={require("../../assets/images/supervio.jpg")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {"Supervisors"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: "left" }}
            >
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
              {"View"}
            </Button>
          </CardActions>
        </Card>
      </div>
      <div style={{ marginLeft: "30px" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="250"
            image={require("../../assets/images/submiso.jpg")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {"Submissions"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: "left" }}
            >
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
              {"View"}
            </Button>
          </CardActions>
        </Card>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Join Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Request a research group that you want them to add you to their
            group. If they accept your request, you will be added to their
            group.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group ID"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Request</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
