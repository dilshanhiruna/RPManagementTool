import { Button, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateGroup.css";

export default function CreateGroup({ user }) {
  const API = process.env.REACT_APP_API;
  const [Student, setStudent] = useState([]);
  const [GroupID, setGroupID] = useState("");
  const [SelectedStudent, setSelectedStudent] = useState("");
  const [GroupMembers, setGroupMembers] = useState([
    { id: user._id, name: user.name },
  ]);
  const [showError, setshowError] = useState(false);

  const fetchStudentsByKeyword = async (keyword) => {
    if (keyword.length < 3) {
      return;
    }
    try {
      const response = await axios.get(`${API}/users/students/${keyword}`);
      setStudent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // add student to group
  const addStudent = (student) => {
    // check if student is already in group by id
    if (GroupMembers.find((member) => member.id === student.id)) {
      return;
    }
    if (!student.id) {
      return;
    }

    setGroupMembers([...GroupMembers, student]);
    setSelectedStudent("");
  };

  //function to create group
  const createGroup = async () => {
    if (GroupMembers.length < 2 || GroupID === "") {
      setshowError(true);
      setTimeout(() => {
        setshowError(false);
      }, 3000);
      return;
    }
    const group = {
      GroupID: GroupID,
      student1: GroupMembers[0].id,
      student2: GroupMembers[1] ? GroupMembers[1].id : null,
      student3: GroupMembers[2] ? GroupMembers[2].id : null,
      student4: GroupMembers[3] ? GroupMembers[3].id : null,
    };
    try {
      const response = await axios.post(`${API}/studentgroups`, group);
      console.log(response);

      //direct to dashboard
      window.location.href = `/student`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="creategroup__component">
      <div className="creategroup__addstudents">
        <div>
          <h1>Let's create a new group</h1>
          <TextField
            required
            id="outlined-basic"
            label="Enter Group ID"
            variant="outlined"
            sx={{ width: 250 }}
            onChange={(e) => setGroupID(e.target.value)}
          />
          <h3>Search members to your group</h3>
          <div style={{ display: "flex" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              getOptionLabel={(option) => option.name}
              sx={{ width: 400 }}
              onInputChange={(event, value) => {
                fetchStudentsByKeyword(value);
              }}
              onChange={(event, value) => {
                if (value) {
                  setSelectedStudent({
                    name: value.name,
                    id: value._id,
                  });
                }
              }}
              //disable who are already in a group
              getOptionDisabled={(option) => option.studentGrouped === true}
              options={Student}
              renderInput={(params) => (
                <TextField {...params} label="Student" />
              )}
              isOptionEqualToValue={(option, value) => {
                return option.name === value.name;
              }}
            />
            <Button
              variant="outlined"
              size="large"
              style={{ height: "55px", marginLeft: "10px" }}
              onClick={() => {
                addStudent(SelectedStudent);
              }}
              disabled={GroupMembers.length >= 4}
            >
              ADD
            </Button>
          </div>
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
              Error, please check again!
            </Alert>
          </Collapse>
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
            onClick={() => {
              createGroup();
            }}
          >
            Create Group
          </Button>
        </div>
      </div>
      <div className="creategroup__addedstudents">
        <h3>Your group members {GroupMembers.length}/4</h3>
        <div>
          <div className="creategroup__groupmembers">
            {GroupMembers.map((member) => {
              return (
                <Chip
                  key={member.id}
                  label={member.name}
                  color={member.id === user._id ? "primary" : "default"}
                  onDelete={() => {
                    //you cant delete yourself
                    if (member.id === user._id) {
                      return;
                    }
                    setGroupMembers(
                      GroupMembers.filter((m) => m.id !== member.id)
                    );
                  }}
                  style={{ margin: "10px", padding: "10px", fontSize: "15px" }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
