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
import ViewStudentSubmissions from "../components/Staff/ViewStudentSubmissions";
import PanelmHeader from "../components/view/PanelmHeader";
import ViewStudentSubmissionsPanel from "../components/Staff/Panel-Member/ViewStudentSubmissionsPanel";
import TopicRequrestsForPanel from "../components/Staff/Panel-Member/TopicRequrestsForPanel";

export default function Staff({ user }) {
  const API = process.env.REACT_APP_API;

  // user = {
  //   _id: "628d0363cec8f51cfb6dd746",
  //   uid: "ST22000001",
  //   name: "Nuwan Kodagoda (SE, HPC, PC,PL, ADD)",
  //   email: "st22000001@sliit.lk",
  //   password: "password",
  //   role: "staff",
  //   interestedResearchField: "Artificial Intelligence and Machine Learning",
  //   staffType: "supervisors",
  //   studentGrouped: null,
  //   studentGroupID: null,
  // };

  return (
    <div className="student__dashboard">
      <Router>
        {" "}
        {user.staffType === "supervisor" ? (
          <StaffHeader userType={"Staff"} user={user} />
        ) : (
          <PanelmHeader userType={"Staff"} user={user} />
        )}
        <Switch>
          <Route exact path="/staff"></Route>
          {/* routes of supervisor */}
          <Route exact path="/staff/supervisor/topicReq">
            <SuperviosrRequests user={user} />
          </Route>
          <Route exact path="/staff/cosupervisor/topicReq">
            <CoSuperviosrRequests user={user} />
          </Route>
          <Route exact path="/staff/mygroups">
            <ViewMyStudentGroups user={user} />
          </Route>
          <Route exact path="/staff/studentSubmissions">
            <ViewStudentSubmissions user={user} />
          </Route>
          {/* routes of panele members */}
          {/* <Route exact path="/staff/panelmember"></Route> */}
          <Route exact path="/staff/panelmember/topicReq">
            <TopicRequrestsForPanel user={user} />
          </Route>
          <Route exact path="/staff/panelmember/studentSubmissions">
            <ViewStudentSubmissionsPanel user={user} />
          </Route>
          {user.staffType === "supervisor" ? (
            <Redirect to="/staff/mygroups" />
          ) : (
            <Redirect to="/staff/panelmember/topicReq" />
          )}
        </Switch>
      </Router>

      <footer />
    </div>
  );
}
