import React from "react";
import Header from "../components/view/Header";
// import SupervisorHeader from "../components/view/SupervisorHeader";
import StaffHeader from "../components/view/StaffHeader";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import SupervisorDashboard from "../components/Staff/SupervisorDashboard";
import SuperviosrRequests from "../components/Staff/SuperviosrRequests";
import CoSuperviosrRequests from "../components/Staff/CoSuperviosrRequests";
import ViewMyStudentGroups from "../components/Staff/ViewMyStudentGroups";

export default function Staff() {
  const API = process.env.REACT_APP_API;

  const user = {
    _id: "628d0363cec8f51cfb6dd746",
    uid: "ST22000001",
    name: "Nuwan Kodagoda (SE, HPC, PC,PL, ADD)",
    email: "st22000001@sliit.lk",
    password: "password",
    role: "staff",
    interestedResearchField: "Artificial Intelligence and Machine Learning",
    staffType: "supervisor",
    studentGrouped: null,
    studentGroupID: null,
  };

  return (
    <div className="student__dashboard">
      <StaffHeader userType={"Staff"} />
      <Router>
        <Switch>
          <Route exact path="/staff"></Route>
          {/* <Route exact path="/supervisor">
            <SupervisorDashboard user={user} />
          </Route> */}
          <Route exact path="/staff/supervisor/topicReq">
            <SuperviosrRequests user={user} />
          </Route>
          <Route exact path="/staff/cosupervisor/topicReq">
            <CoSuperviosrRequests user={user} />
          </Route>
          <Route exact path="/staff/mygroups">
            <ViewMyStudentGroups user={user} />
          </Route>
          <Redirect to="/staff/mygroups" />
        </Switch>
      </Router>
      <footer />
    </div>
  );
}
