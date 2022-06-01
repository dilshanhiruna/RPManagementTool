import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Header.css";

export default function Header({ userType }) {
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
              <Button variant="outlined" className="header__button">
                Click
              </Button>
              <Button variant="outlined" className="header__button">
                Click
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
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Profile
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
