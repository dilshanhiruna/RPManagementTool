import { Button, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateGroup.css";

export default function CreateGroup({ user }) {
  const API = process.env.REACT_APP_API;
  const [Student, setStudent] = useState([]);
  const [SelectedStudent, setSelectedStudent] = useState("");
  const [GroupMembers, setGroupMembers] = useState([
    { id: user._id, name: user.name },
  ]);

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
    if (GroupMembers.length < 2) {
      alert("Please add at least 2 members to the group");
      return;
    }
    const group = {
      student1: GroupMembers[0].id,
      student2: GroupMembers[1] ? GroupMembers[1].id : null,
      student3: GroupMembers[2] ? GroupMembers[2].id : null,
      student4: GroupMembers[3] ? GroupMembers[3].id : null,
    };
    try {
      const response = await axios.post(`${API}/studentgroups`, group);
      console.log(response);
      alert("Group Created Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="creategroup__component">
      <div className="creategroup__addstudents">
        <div>
          <h1>Let's create a new group</h1>
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
            onClick={() => {
              createGroup();
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
