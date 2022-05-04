import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

export default function Staff() {
  return (
    <div className="staff__dashboard">
      <Header userType={"Staff"} />
      <Switch>
        <Route exact path="/staff"></Route>
        <Redirect to="/staff/404" />
      </Switch>
      <footer />
    </div>
  );
}
