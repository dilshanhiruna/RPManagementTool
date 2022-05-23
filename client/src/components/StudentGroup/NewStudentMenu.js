import React from "react";
import "./NewStudentMenu.css";
import MediaCard from "../Common/MediaCard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

export default function NewStudentMenu() {
  const history = useHistory();

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
              size="small"
              onClick={() => (window.location.href = "/student/creategroup")}
            >
              {"Create"}
            </Button>
            <Button size="small">{"Learn More"}</Button>
          </CardActions>
        </Card>
      </div>
      <div style={{ marginLeft: "30px" }}>
        <MediaCard
          title="Join Group"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
          btn1="Join "
          btn2="Learn More"
          image={require("../../assets/images/joinGroup.png")}
        />
      </div>
    </div>
  );
}
