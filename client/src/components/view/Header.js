import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";

export default function Header({ userType }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  history.push("/admin/createsubmission");
                }}
              >
                Create Submission
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => {
                  history.push("/admin/getAllSubmissions");
                }}
              >
                All Submissions
              </Button>
            </div>
          </div>
          <div className="header__right">
            <Button
              variant="contained"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              style={{
                borderRadius: "20px",
                width: "100px",
                backgroundColor: "rgb(60, 60, 60)",
              }}
              className="header__button"
              onClick={handleClick}
            >
              Profile
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
}
