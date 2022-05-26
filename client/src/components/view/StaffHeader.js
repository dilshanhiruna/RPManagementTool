import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Header.css";

export default function StaffHeader({ userType }) {
  const redirect = () => {};
  return (
    <>
      <header>
        <div className="header__component">
          <div className="header__left">
            <div>
              <p>Research Project Management</p>
              <p>{userType} Portal</p>
            </div>
            <div className="header__buttonGroup">
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  window.location.href = "/staff/supervisor/topicReq";
                }}
              >
                Supervisor Requests
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  window.location.href = "/staff/cosupervisor/topicReq";
                }}
              >
                Co-Supervisor Requests
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  window.location.href = "/staff/mygroups";
                }}
              >
                My Groups
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
