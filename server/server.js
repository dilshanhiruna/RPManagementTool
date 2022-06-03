const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("./common/db")();
require("dotenv").config();

const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

//Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// Route files
const studentGroups = require("./routes/StudentGroups");
const user = require("./routes/User");
const supervisorRequests = require("./routes/supervisorRequests");
const cosupervisorRequests = require("./routes/CoSupervisorRequests");
const submissions = require("./routes/Submissions");
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");

// Mount routers
app.use("/api/v1/studentgroups", studentGroups);
app.use("/api/v1/users", user);
app.use("/api/v1/supervisorRequests", supervisorRequests);
app.use("/api/v1/cosupervisorRequests", cosupervisorRequests);
app.use("/api/v1/AssignmentSubmissions", submissions);
app.use(userRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
