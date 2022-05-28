import React from "react";
import NewStudentMenu from "../components/StudentGroup/NewStudentMenu";
import CreateGroup from "../components/StudentGroup/CreateGroup";
import Header from "../components/view/Header";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import ChatMenu from "../components/StudentGroup/ChatMenu";
import TopicReg from "../components/StudentGroup/TopicReg";
import SearchSupervisor from "../components/StudentGroup/SearchSupervisor";
import StudentDashboard from "../components/StudentGroup/StudentDashboard";
import StudentHeader from "../components/view/StudentHeader";
import SubmissionDetails from "../components/StudentGroup/SubmissionDetails";

export default function Student() {
  const API = process.env.REACT_APP_API;

  const user = {
    _id: "628a4cd9c334a17636b35847",
    uid: "IT19963884",
    name: "Andaraweera D.H.",
    email: "it19963884@my.sliit.lk",
    password: "password",
    role: "student",
    interestedResearchField: null,
    staffType: null,
    studentGrouped: true,
    studentGroupID: "628e55274a2760fe44048084",
  };

  return (
    <div className="student__dashboard">
      <StudentHeader userType={"Student"} />

      <Switch>
        <Route exact path="/student">
          {!user.studentGrouped ? (
            <NewStudentMenu />
          ) : (
            <StudentDashboard user={user} />
          )}
        </Route>
        <Route exact path="/student/creategroup">
          <CreateGroup user={user} />
        </Route>
        <Route exact path="/student/topicreg">
          <TopicReg user={user} />
        </Route>
        <Route exact path="/student/searchsupervisor">
          <SearchSupervisor user={user} />
        </Route>
        <Route exact path="/student/submissionDetails">
          <SubmissionDetails user={user} />
        </Route>
        <Redirect to="/student" />
      </Switch>

      <footer />
    </div>
  );
}
