import { Button, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import "./CreateGroup.css";

export default function CreateGroup() {
  return (
    <div className="creategroup__component">
      <div className="creategroup__addstudents">
        <div>
          <h1>Let's create a new group</h1>
          <h3>Add members to your group</h3>
          <div>
            <TextField
              id="outlined-basic"
              label="StudentID"
              variant="outlined"
              style={{ width: "70%" }}
            />
            <Button
              variant="outlined"
              size="large"
              style={{ height: "55px", marginLeft: "10px" }}
            >
              ADD
            </Button>
          </div>
        </div>
        <div className="creategroup__button">
          <Button
            variant="contained"
            size="large"
            style={{
              height: "60px",
              width: "200px",
              borderRadius: "40px",
            }}
          >
            Create Group
          </Button>
        </div>
      </div>
      <div className="creategroup__addedstudents">
        <h3>Your group members</h3>
        <div>
          <div className="creategroup__groupmembers">
            <Chip
              className="creategroup__groupmembers_chips"
              label="Elon Musk"
              onClick={() => {}}
              onDelete={() => {}}
              style={{ margin: "10px", padding: "10px", fontSize: "15px" }}
            />
            <Chip
              className="creategroup__groupmembers_chips"
              label="Johnny Depp"
              onClick={() => {}}
              onDelete={() => {}}
              style={{ margin: "10px", padding: "10px", fontSize: "15px" }}
            />
            <Chip
              className="creategroup__groupmembers_chips"
              label="Kamala Harris"
              onClick={() => {}}
              onDelete={() => {}}
              style={{ margin: "10px", padding: "10px", fontSize: "15px" }}
            />
            <Chip
              className="creategroup__groupmembers_chips"
              label="Joe Biden "
              onClick={() => {}}
              onDelete={() => {}}
              style={{ margin: "10px", padding: "10px", fontSize: "15px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
