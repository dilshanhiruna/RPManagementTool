import { Button, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import axios from "axios";
import "./TopicReg.css";

export default function TopicReg({ user }) {
  const API = process.env.REACT_APP_API;
  const [topic, setTopic] = React.useState("");

  //TODO: check if a topic already registered

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      axios
        .put(`${API}/studentgroups/researchtopic/${user.studentGroupID}`, {
          researchTopic: topic,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="topicreg__component">
      <div className="topicreg__form">
        <div>
          <h1>Topic Registration</h1>
          <h3>Enter your research group topic here</h3>
          <div>
            <TextField
              id="outlined-basic"
              label="Topic"
              variant="outlined"
              style={{ width: "140%" }}
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
          </div>
        </div>
        <div className="submittopic__button">
          <Button
            variant="contained"
            size="large"
            style={{
              height: "60px",
              width: "200px",
              borderRadius: "40px",
            }}
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Submit Topic
          </Button>
        </div>
      </div>
      <div className="">
        <img
          src={require("../../assets/images/paperdribble.png")}
          alt="paper"
          style={{
            width: "86%",
            top: "-100px",
            left: "100px",
            position: "relative",
            filter: "contrast(105%) ",
          }}
        />
      </div>
    </div>
  );
}
