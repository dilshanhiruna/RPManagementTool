import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

export default function Staff() {
  return (
    <div className="staff__dashboard">
      <Header userType={"Staff"} />
      <Router>
        <Switch>
          <Route exact path="/staff"></Route>
          <Redirect to="/staff/404" />
        </Switch>
      </Router>
      <footer />
    </div>
  );
}
