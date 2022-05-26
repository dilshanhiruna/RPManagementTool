import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      // save chat data in local storage
      // localStorage.setItem("chatData", JSON.stringify(messageList));
    }
  };

  useEffect(() => {
    // get chat data from local storage
    // const chatData = JSON.parse(localStorage.getItem("chatData"));
    // console.log(chatData);
    // if (chatData) {
    //   setMessageList(chatData.filter((message) => message.room === room));
    // }
  }, []);

  useEffect(() => {
    socket.removeAllListeners();
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-body">
        <ScrollToBottom
          className="message-container"
          initialScrollBehavior="smooth"
        >
          {messageList.map((messageContent, key) => {
            return (
              <div
                key={key}
                className="message"
                id={username !== messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div>
        <Stack direction="row" spacing={0}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            placeholder="Type a message..."
            value={currentMessage}
            sx={{
              background: "white",
              borderRadius: "10px",
            }}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <Button
            variant="contained"
            startIcon={<SendIcon sx={{ marginLeft: "11px" }} />}
            onClick={sendMessage}
          ></Button>
        </Stack>
      </div>
    </div>
  );
}

export default Chat;
