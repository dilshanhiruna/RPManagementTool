import React, { useState } from "react";
import "./App.css";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Student from "./routes/Student";
import Staff from "./routes/Staff";
import Admin from "./routes/Admin";
import Supervisor from "./routes/Supervisor";

function App() {
  const [userType, setuserType] = useState("student");
  return (
    <div className="App">
      {userType === "student" ? <Student /> : ""}
      {userType === "staff" ? <Staff /> : ""}
      {userType === "admin" ? <Admin /> : ""}
      {userType === "supervisor" ? <Supervisor /> : ""}
    </div>
  );
}

export default App;
