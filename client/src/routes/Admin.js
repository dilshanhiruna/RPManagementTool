import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Header from "../components/view/AdminHeader";
import CreateSubmission from "../components/AssignmentSubmission/CreateSubmission";
import ViewSubmission from "../components/AssignmentSubmission/ViewSubmission";
import UpdateSubmission from "../components/AssignmentSubmission/UpdateSubmission";

export default function Admin() {
  return (
    <div className="admin__dashboard">
      <Header userType={"Admin"} />
      <Router>
        <Switch>
          <Route exact path="/admin/createsubmission">
            <CreateSubmission />
          </Route>
          <Route exact path="/admin/getAllSubmissions">
            <ViewSubmission />
          </Route>
          <Route exact path="/admin/updatesubmission">
            <UpdateSubmission />
          </Route>
          <Redirect to="/admin/getAllSubmissions" />
        </Switch>
      </Router>
      <footer />
    </div>
  );
}
