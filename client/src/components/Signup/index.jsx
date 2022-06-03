import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Axios from "axios";
import { BrowserRouter } from "react-router-dom";
const API = process.env.REACT_APP_API;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        RPMT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {

	const [data, setData] = useState({
    uid: "",
		name: "",
		staffType: "",
    role: "",
		interestedResearchField: "",
		studentGrouped: "",
    studentGroupID: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

	Axios.post(`${API}/usersignup`, data)
		.then((res) => {
		  alert("Registered");
		localStorage.setItem("token", res.data.data);
		window.location = "/";
		console.log(res.data.data)
		})
		.catch((error) => {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		  //console.log(err);
		});
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={require("../../assets/images/logo.png")}
            alt=""
            width="50"
            style={{ marginRight: "10px" }}
          />
          <h5 style={{ margin: 10, marginBottom: 20 }}>
            Research Project Management
          </h5>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={handleChange}
                  value={data.name}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="uid"
                  label="UID"
                  onChange={handleChange}
                  value={data.uid}
                  name="uid"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="staffType"
                  label="Type"
                  onChange={handleChange}
                  value={data.staffType}
                  name="staffType"
                />
              </Grid>
			        <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  onChange={handleChange}
                  value={data.role}
                  name="role"
                />
              </Grid>
			        <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="interestedResearchField"
                  label="Interested Research Field"
                  onChange={handleChange}
                  value={data.interestedResearchField}
                  name="interestedResearchField"
                />
              </Grid>
			        <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="studentGrouped"
                  label="Student Grouped"
                  onChange={handleChange}
                  value={data.studentGrouped}
                  name="studentGrouped"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="studentGroupID"
                  label="Student Group ID"
                  onChange={handleChange}
                  value={data.studentGroupID}
                  name="studentGroupID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={handleChange}
                  value={data.email}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  value={data.password}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
