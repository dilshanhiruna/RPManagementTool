import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateSubmission from "../components/AssignmentSubmissions/CreateSubmission";
import EditSubmission from "../components/AssignmentSubmissions/EditSubmission";
import Header from "../components/view/Header";

export default function Admin() {
  return (
    <div className="admin__dashboard">
      <Header userType={"Admin"} />
      <Switch>
        <Route exact path="/admin/add">
          <CreateSubmission />
        </Route>
        <Route exact path="/admin/update">
          <EditSubmission />
        </Route>
        <Redirect to="/admin/404" />
      </Switch>
      <footer />
    </div>
  );
}
