const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
require("./common/db")();
require("dotenv").config();
const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Route files
const studentGroups = require("./routes/StudentGroups");
const user = require("./routes/User");
const supervisorRequests = require("./routes/supervisorRequests");
const cosupervisorRequests = require("./routes/CoSupervisorRequests");

// Mount routers
app.use("/api/v1/studentgroups", studentGroups);
app.use("/api/v1/users", user);
app.use("/api/v1/supervisorRequests", supervisorRequests);
app.use("/api/v1/cosupervisorRequests", cosupervisorRequests);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
