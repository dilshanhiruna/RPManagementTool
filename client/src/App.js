import React, { useState } from "react";
import jwt from "jwt-decode";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Student from "./routes/Student";
import Staff from "./routes/Staff";
import Admin from "./routes/Admin";
import Signup from "./components/view/Signup";
import Signin from "./components/view/Signin";
// import Supervisor from "./routes/Supervisor";
import LoginRouter from "./routes/LoginRouter";
import Login from "./components/Login";

import Home from "./components/Home";
import EditUser from "./components/EditUser";
import UserDetails from "./components/UserDetails";

function App() {
  const token = localStorage.getItem("token");
  let role = "";
  let userObj = "";

  if (token) {
    const payload = jwt(token);
    role = payload.role;
    userObj = payload;
  }

  const [userType, setUserType] = useState(role);

  return (
    <Router>
      <div className="App">
        {userType === "" ? <Signin /> : ""}
        {userType === "student" ? <Student user={userObj} /> : ""}
        {userType === "staff" ? <Staff user={userObj} /> : ""}
        {userType === "admin" ? <Admin /> : ""}

        {/* {userType === "supervisor" ? <Supervisor /> : ""} */}
      </div>
    </Router>
  );
}

export default App;
