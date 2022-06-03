import React, { useEffect, useState } from "react";
import NewStudentMenu from "../components/StudentGroup/NewStudentMenu";
import CreateGroup from "../components/StudentGroup/CreateGroup";
import Header from "../components/view/Header";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import axios from "axios";
import ChatMenu from "../components/StudentGroup/ChatMenu";
import TopicReg from "../components/StudentGroup/TopicReg";
import SearchSupervisor from "../components/StudentGroup/SearchSupervisor";
import StudentDashboard from "../components/StudentGroup/StudentDashboard";
import StudentHeader from "../components/view/StudentHeader";
import SubmissionDetails from "../components/StudentGroup/SubmissionDetails";

export default function Student({ user }) {
  const API = process.env.REACT_APP_API;

  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialUser() {
      try {
        const response = await axios.get(`${API}/users/${user._id}`);
        const userData = await response.data.data;
        !userData ? setUser(null) : setUser(userData);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    }
    initialUser();
  }, []);
  return !Loading ? (
    <div className="student__dashboard">
      <StudentHeader userType={"Student"} user={User} />

      <Switch>
        <Route exact path="/student">
          {!User.studentGrouped ? (
            <NewStudentMenu />
          ) : (
            <StudentDashboard user={User} />
          )}
        </Route>
        <Route exact path="/student/creategroup">
          <CreateGroup user={User} />
        </Route>
        <Route exact path="/student/topicreg">
          <TopicReg user={User} />
        </Route>
        <Route exact path="/student/searchsupervisor">
          <SearchSupervisor user={User} />
        </Route>
        <Route exact path="/student/submissionDetails">
          <SubmissionDetails user={User} />
        </Route>
        <Redirect to="/student" />
      </Switch>

      <footer />
    </div>
  ) : null;
}
