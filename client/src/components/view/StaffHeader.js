import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Header.css";
import { useHistory } from "react-router-dom";

export default function StaffHeader({ userType }) {
  const history = useHistory();
  const redirect = () => {};
  return (
    <>
      <header>
        <div className="header__component">
          <div className="header__left">
            <img
              src={require("../../assets/images/logo.png")}
              alt=""
              width="50"
              style={{ marginRight: "10px" }}
            />
            <div>
              <p>Research Project Management</p>
              <p>{userType} Portal</p>
            </div>
            <div className="header__buttonGroup">
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/staff/mygrosups");
                }}
              >
                My Groups
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/staff/supervisor/topicReq");
                }}
              >
                Supervisor Requests
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/staff/cosupervisor/topicReq");
                }}
              >
                Co-Supervisor Requests
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/staff/studentSubmissions");
                }}
              >
                Submissions
              </Button>
            </div>
          </div>
          <div className="header__right">
            <Button
              variant="contained"
              style={{
                borderRadius: "20px",
                width: "100px",
                backgroundColor: "rgb(60, 60, 60)",
              }}
              className="header__button"
            >
              Profile
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
