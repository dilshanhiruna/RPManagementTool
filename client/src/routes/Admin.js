import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Header from "../components/view/Header";
import CreateSubmission from "../components/AssignmentSubmission/CreateSubmission";

export default function Admin() {
  return (
    <div className="admin__dashboard">
      <Header userType={"Admin"} />
      <Router>
        <Switch>
          {/* <Route exact path="/admin"></Route> */}
          <Route exact path="/admin/create">
            <CreateSubmission />
          </Route>
          <Redirect to="/admin/404" />
        </Switch>
      </Router>
      <footer />
    </div>
  );
}
