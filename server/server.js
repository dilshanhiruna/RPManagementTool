const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./common/db")();
require("dotenv").config();

const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

//Body parser
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));

// Route files
const studentGroups = require("./routes/StudentGroups");
const submissions = require("./routes/Submissions");

// Mount routers
app.use("/api/v1/studentgroups", studentGroups);
app.use("/api/v1/AssignmentSubmissions", submissions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
