const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
// Mount routers
app.use("/api/v1/studentgroups", studentGroups);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
