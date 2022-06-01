import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Header.css";
import { useHistory } from "react-router-dom";

export default function StudentHeader({ userType }) {
  let history = useHistory();

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
                  history.push("/student");
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/student/topicreg");
                }}
              >
                Our Topic
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/student/searchsupervisor");
                }}
              >
                Supervisors
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
