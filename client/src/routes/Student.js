import React from "react";
import NewStudentMenu from "../components/StudentGroup/NewStudentMenu";
import CreateGroup from "../components/StudentGroup/CreateGroup";
import Header from "../components/view/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import ChatMenu from "../components/StudentGroup/ChatMenu";
import TopicReg from "../components/StudentGroup/TopicReg";
import SearchSupervisor from "../components/StudentGroup/SearchSupervisor";

export default function Student() {
  return (
    <div className="student__dashboard">
      <Header userType={"Student"} />
      <Switch>
        <Route exact path="/student">
          <NewStudentMenu />
        </Route>
        <Route exact path="/student/creategroup">
          <CreateGroup />
        </Route>
        <Route exact path="/student/topicreg">
          <TopicReg />
        </Route>
        <Route exact path="/student/searchsupervisor">
          <SearchSupervisor />
        </Route>
        <Route exact path="/student/chat">
          <ChatMenu />
        </Route>
        <Redirect to="/student/404" />
      </Switch>
      <footer />
    </div>
  );
}
