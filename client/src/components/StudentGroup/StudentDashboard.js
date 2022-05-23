import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import "./StudentDashboard.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ItemStudent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#1976d2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
}));

export default function StudentDashboard({ user }) {
  const API = process.env.REACT_APP_API;
  const [studentGroup, setStudentGroup] = useState([]);
  const [Students, setStudents] = useState([]);
  const [Student, setStudent] = useState([]);
  const [SelectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    axios.get(`${API}/studentgroups/${user.studentGroupID}`).then((res) => {
      setStudentGroup(res.data);
      let studentGroup = res.data.data;

      setStudents([
        studentGroup.student1,
        studentGroup.student2 ? studentGroup.student2 : "",
        studentGroup.student3 ? studentGroup.student3 : "",
        studentGroup.student4 ? studentGroup.student4 : "",
      ]);
    });
  }, []);

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
  return (
    <div className="student__dashboard">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item
              sx={{
                height: "75vh",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option.name}
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
                variant="contained"
                sx={{
                  marginTop: "5px",
                  marginBottom: "50px",
                  width: "100%",
                }}
              >
                Add Member
              </Button>
              {Students.filter((stu) => {
                return stu !== "";
              }).map((student) => (
                <ItemStudent key={student._id} elevation={2}>
                  <h3>{student.name}</h3>
                  <p>{student.email}</p>
                </ItemStudent>
              ))}
            </Item>
          </Grid>
          <Grid item xs={9}>
            <Item
              sx={{
                height: "75vh",
              }}
            ></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
