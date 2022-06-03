import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { useHistory } from "react-router-dom";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function StudentHeader({ userType, user }) {
  let history = useHistory();

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
              {user.studentGrouped && (
                <>
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
                </>
              )}
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
              <MenuItem disabled>{user.uid}</MenuItem>
              <MenuItem disabled>{user.name}</MenuItem>
              <MenuItem disabled>{user.email}</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My account</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                <ListItemIcon>
                  <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
}
