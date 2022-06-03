import React, { useState } from "react";
import "./App.css";
//import { Switch, BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import Student from "./routes/Student";
import Staff from "./routes/Staff";
import Admin from "./routes/Admin";
// import Supervisor from "./routes/Supervisor";
import LoginRouter from "./routes/LoginRouter";

import jwt from 'jwt-decode'
import Home from './components/Home';
import EditUser from './components/EditUser';
import UserDetails from './components/UserDetails';

// function App() {
//   const [userType, setuserType] = useState("student");
//   return (
//     <Router>
//       <div className="App">
//         {userType === "student" ? <Student /> : ""}
//         {userType === "staff" ? <Staff /> : ""}
//         {userType === "admin" ? <Admin /> : ""}
//         {/* {userType === "supervisor" ? <Supervisor /> : ""} */}
//       </div>
//     </Router>
//   );
// }

function App() {

  const token = localStorage.getItem("token");
  let role = "";

  if(token) {
    const payload = jwt(token);
    role = payload.role;
  }

  const [userType, setUserType] = useState(role);

  //TODO: Check the user and set user type

  return (
    <div className="App">
      <BrowserRouter>
      <div className="container"> 
        <Switch>
          {userType === "" ? <LoginRouter /> : ""}
          {userType === "Student" ? <Student /> : ""}
          {userType === "Admin" ? <Home /> : ""}
          {userType === "Supervisor" ? <Staff /> : ""}
          {/* {userType === "CoSupervisor" ? <CoSupervisor /> : ""} */}
        </Switch>   
        <Route path="/allusers" exact component ={Home}></Route>
        <Route path="/edit/:id" component={EditUser}></Route>
        <Route path="/user/:id" component={UserDetails}></Route> 
        <Route path="/student" component={Student}></Route> 
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
