import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Header from "../components/view/Header";

export default function Admin() {
  return (
    <div className="admin__dashboard">
      <Header userType={"Admin"} />

      <Switch>
        <Route exact path="/admin"></Route>
        <Redirect to="/admin" />
      </Switch>

      <footer />
    </div>
  );
}
