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

export default function Student() {
  const user = {
    _id: "628a4cd9c334a17636b35847",
    uid: "IT19963884",
    name: "Andaraweera D.H. ",
    email: "it19963884@my.sliit.lk",
    password: "password",
    role: "student",
    interestedResearchField: null,
    staffType: null,
    studentGrouped: true,
  };

  return (
    <div className="student__dashboard">
      <Header userType={"Student"} />
      <Router>
        <Switch>
          <Route exact path="/student">
            {!user.studentGrouped ? (
              <NewStudentMenu />
            ) : (
              <CreateGroup user={user} />
            )}
          </Route>
          <Route exact path="/student/creategroup">
            <CreateGroup user={user} />
          </Route>
          <Route exact path="/student/topicreg">
            <TopicReg />
          </Route>
          <Route exact path="/student/searchsupervisor">
            <SearchSupervisor />
          </Route>
          <Route exact path="/student/chat"></Route>
          <Redirect to="/student/404" />
        </Switch>
      </Router>
      <footer />
    </div>
  );
}
