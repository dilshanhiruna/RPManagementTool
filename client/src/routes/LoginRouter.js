import React from "react";
// import Header from '../components/view/Header';
import Footer from "../components/view/Footer";
// import AdminViewMovies from '../components/MovAdmin/AdminViewMovies';
// import MovAdminHeader from '../components/view/MovAdminHeader';
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login/index";
import Signup from "../components/Signup/index";
import Logout from "../components/Logout/index";

export default function LoginRouter() {
  return (
    <div className="movadmin__view">
      {/* <MovAdminHeader title={'Movies'} user={'movadmin'} /> */}
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Redirect to="/login" />
      </Switch>
      <Footer />
    </div>
  );
}
