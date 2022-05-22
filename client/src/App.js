import React, { useState } from "react";
import "./App.css";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Student from "./routes/Student";
import Staff from "./routes/Staff";
import Admin from "./routes/Admin";

function App() {
  const [userType, setuserType] = useState("student");
  return (
    <div className="App">
      {userType === "student" ? <Student /> : ""}
      {userType === "admin" ? <Staff /> : ""}
      {userType === "staff" ? <Admin /> : ""}
    </div>
  );
}

export default App;
