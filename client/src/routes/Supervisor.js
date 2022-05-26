// import React from "react";
// import Header from "../components/view/Header";
// import SupervisorHeader from "../components/view/SupervisorHeader";
// import {
//   Switch,
//   Route,
//   Redirect,
//   BrowserRouter as Router,
// } from "react-router-dom";
// import SupervisorDashboard from "../components/Staff/SupervisorDashboard";
// import SuperviosrRequests from "../components/Staff/SuperviosrRequests";

// export default function Supervisor() {
//   const API = process.env.REACT_APP_API;

//   const user = {
//     _id: "628d0363cec8f51cfb6dd746",
//     uid: "ST22000001",
//     name: "Nuwan Kodagoda (SE, HPC, PC,PL, ADD)",
//     email: "st22000001@sliit.lk",
//     password: "password",
//     role: "staff",
//     interestedResearchField: "Artificial Intelligence and Machine Learning",
//     staffType: "supervisor",
//     studentGrouped: null,
//     studentGroupID: null,
//   };

//   return (
//     <div className="student__dashboard">
//       <SupervisorHeader userType={"Supervisor"} />
//       <Router>
//         <Switch>
//           <Route exact path="/supervisor">
//             <SupervisorDashboard user={user} />
//           </Route>
//           <Route exact path="/supervisor/topicReq">
//             <SuperviosrRequests user={user} />
//           </Route>
//           <Redirect to="/supervisor" />
//         </Switch>
//       </Router>
//       <footer />
//     </div>
//   );
// }
