import React from "react";
import "./App.css";
import { Switch, BrowserRouter } from "react-router-dom";
import Student from "./routes/Student";
import Staff from "./routes/Staff";
import Admin from "./routes/Admin";

function App() {
  // const [userType, setuserType] = useState("student");
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Student />
          {/* {userType === "student" ? <Student /> : ""}
          {userType === "admin" ? <Staff /> : ""}
          {userType === "staff" ? <Admin /> : ""} */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
