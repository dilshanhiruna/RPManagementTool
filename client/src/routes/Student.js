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

export default function Student({ user }) {
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
