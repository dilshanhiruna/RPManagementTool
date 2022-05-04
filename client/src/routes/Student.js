import React from "react";
import NewStudentMenu from "../components/StudentGroup/NewStudentMenu";
import CreateGroup from "../components/StudentGroup/CreateGroup";
import Header from "../components/view/Header";
import { Switch, Route, Redirect } from "react-router-dom";

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
        <Redirect to="/student/404" />
      </Switch>
      <footer />
    </div>
  );
}
