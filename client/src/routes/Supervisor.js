import React from 'react';
import Header from '../components/view/Header';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import SupervisorDashboard from '../components/Staff/SupervisorDashboard';

export default function Supervisor() {
  const API = process.env.REACT_APP_API;

  return (
    <div className="student__dashboard">
      <Header userType={'Supervisor'} />
      <Router>
        <Switch>
          <Route exact path="/supervisor">
            <SupervisorDashboard />
          </Route>
          <Redirect to="/supervisor" />
        </Switch>
      </Router>
      <footer />
    </div>
  );
}
