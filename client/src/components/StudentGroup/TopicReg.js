import { Button, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopicReg.css";

export default function TopicReg({ user }) {
  const API = process.env.REACT_APP_API;
  const [NewTopic, setNewTopic] = useState("");
  const [hasTopic, sethasTopic] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [showError, setshowError] = useState(false);

  const fetchTopic = async () => {
    try {
      await axios
        .get(`${API}/studentgroups/${user.studentGroupID}`)
        .then((res) => {
          if (res.data.data.researchTopic) {
            sethasTopic(res.data.data.researchTopic);
            setNewTopic(res.data.data.researchTopic);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTopic();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (NewTopic.length < 1) {
      setshowError(true);
      setTimeout(() => {
        setshowError(false);
      }, 3000);
      return;
    }
    try {
      axios
        .put(`${API}/studentgroups/researchtopic/${user.studentGroupID}`, {
          researchTopic: NewTopic,
        })
        .then((res) => {
          fetchTopic();
          setshowAlert(true);
          //hide alert after 3 seconds
          setTimeout(() => {
            setshowAlert(false);
          }, 3000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="topicreg__component">
      <div className="topicreg__form">
        <div>
          {hasTopic?.length > 0 ? (
            <h1>Update Your Topic</h1>
          ) : (
            <h1>Topic Registration</h1>
          )}
          <h3>Enter your research group topic here</h3>
          <div>
            <TextField
              id="outlined-basic"
              label="Topic"
              variant="outlined"
              style={{ width: "140%" }}
              value={NewTopic}
              onChange={(event) => setNewTopic(event.target.value)}
            />
            <Collapse in={showAlert}>
              <Alert
                hidden
                severity="success"
                color="success"
                sx={{
                  width: "132%",
                  marginTop: "1rem",
                }}
              >
                Your Research topic registered successfully!
              </Alert>
            </Collapse>
            <Collapse in={showError}>
              <Alert
                hidden
                severity="error"
                color="error"
                sx={{
                  width: "132%",
                  marginTop: "1rem",
                }}
              >
                Error, please check your topic again!
              </Alert>
            </Collapse>
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
            {hasTopic?.length > 0 ? "Update Topic" : "Submit Topic"}
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
