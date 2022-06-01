const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
require("./common/db")();
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const Msg = require("./models/messages");

//request allow any domain
app.use(cors({ origin: "*" }));

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
const studentSubmission = require("./routes/StudentSubmission");

// Mount routers
app.use("/api/v1/studentgroups", studentGroups);
app.use("/api/v1/users", user);
app.use("/api/v1/supervisorRequests", supervisorRequests);
app.use("/api/v1/cosupervisorRequests", cosupervisorRequests);
app.use("/api/v1/AssignmentSubmissions", submissions);
app.use("/api/v1/studentSubmission", studentSubmission);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    //get messages form mongodb and send to client
    const messages = Msg.find({ room: data }).limit(100).sort({ _id: 1 });
    messages.exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        socket.emit("get_messages", data);
      }
    });
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    const message = new Msg({
      room: data.room,
      message: data.message,
      author: data.author,
      time: data.time,
    });
    message.save();
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, console.log(`Server running on port ${PORT}`));

module.exports = app;
