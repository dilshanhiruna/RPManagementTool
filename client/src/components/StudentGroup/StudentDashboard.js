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
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#c7c7c7",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function StudentDashboard({ user }) {
  const API = process.env.REACT_APP_API;
  const [studentGroup, setStudentGroup] = useState([]);
  const [Students, setStudents] = useState([]);
  const [Student, setStudent] = useState([]);
  const [SelectedStudent, setSelectedStudent] = useState("");

  const fetchStudentGroup = async () => {
    try {
      axios.get(`${API}/studentgroups/${user.studentGroupID}`).then((res) => {
        setStudentGroup(res.data.data);
        let studentGroup = res.data.data;
        console.log(res.data.data.student1._id);

        setStudents([
          studentGroup.student1,
          studentGroup.student2 ? studentGroup.student2 : "",
          studentGroup.student3 ? studentGroup.student3 : "",
          studentGroup.student4 ? studentGroup.student4 : "",
        ]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudentGroup();
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
  const addStudent = () => {
    if (!SelectedStudent) {
      return;
    }
    axios
      .put(`${API}/studentgroups/${user.studentGroupID}`, { SelectedStudent })
      .then((res) => {
        fetchStudentGroup();
        setSelectedStudent("");
        setStudent([]);
      });
  };

  const removeStudent = (studentID) => {
    //get object number in array by the student id
    let studentNo = Students.findIndex((student) => student._id === studentID);

    axios
      .delete(
        `${API}/studentgroups/${user.studentGroupID}/${studentID}/student${
          studentNo + 1
        }`
      )
      .then((res) => {
        console.log(res);
        fetchStudentGroup();
      });
    console.log(studentNo);
  };

  return (
    <div className="student__dashboard">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item
              sx={{
                height: "95vh",
              }}
            >
              <Autocomplete
                disabled={
                  Students.filter((stu) => {
                    return stu !== "";
                  }).length >= 4
                }
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option.name}
                onInputChange={(event, value) => {
                  fetchStudentsByKeyword(value);
                }}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedStudent(value._id);
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
                disabled={
                  Students.filter((stu) => {
                    return stu !== "";
                  }).length >= 4
                }
                variant="contained"
                sx={{
                  marginTop: "5px",
                  marginBottom: "50px",
                  width: "100%",
                }}
                onClick={() => {
                  addStudent();
                }}
              >
                Add Member
              </Button>
              {Students.filter((stu) => {
                return stu !== "";
              }).map((student, key) => (
                <ItemStudent key={key} elevation={2}>
                  <h3>{student.name}</h3>
                  <p>{student.email}</p>
                  <Button
                    //hide the button if your are no the  leader
                    hidden={studentGroup.student1._id !== user._id}
                    disabled={student._id === user._id}
                    size="small"
                    // sx={{
                    //   backgroundColor: "#fff",
                    //   textTransform: "none",
                    // }}
                    color="error"
                    onClick={() => {
                      removeStudent(student._id);
                    }}
                  >
                    Remove from group
                  </Button>
                </ItemStudent>
              ))}
            </Item>
          </Grid>
          <Grid item xs={9}>
            <Item
              sx={{
                height: "95vh",
              }}
            ></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
