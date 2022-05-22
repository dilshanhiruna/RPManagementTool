import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

export default function MediaCard({ title, description, btn1, btn2, image }) {
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="250" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push("/student/creategroup")}
        >
          {btn1}
        </Button>
        <Button size="small">{btn2}</Button>
      </CardActions>
    </Card>
  );
}
