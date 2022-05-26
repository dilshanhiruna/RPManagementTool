import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Header.css";

<<<<<<< HEAD:client/src/components/view/StaffHeader.js
export default function StaffHeader({ userType }) {
=======
export default function SupervisorHeader({ userType }) {
>>>>>>> 1a93f04645bf7748f49fba22397dbfea3d240d5d:client/src/components/view/SupervisorHeader.js
  const redirect = () => {
    console.log("hey");
  };
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
                onClick={() => redirect()}
              >
                Supervisor Requests
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => redirect()}
              >
                Co-Supervisor Requests
              </Button>
              <Button variant="outlined" className="header__button">
                My Groups
              </Button>
              <Button variant="outlined" className="header__button">
                Click
              </Button>
              <Button variant="outlined" className="header__button">
                Click
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
