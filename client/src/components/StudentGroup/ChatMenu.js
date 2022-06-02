import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";

const API = process.env.REACT_APP_CHAT_API;

const socket = io.connect(API, {
  transports: ["websocket"],
});

function ChatMenu({ studentGroup, user }) {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    socket.connect();
    if (user.uid !== "" && studentGroup._id !== "") {
      socket.emit("join_room", studentGroup._id);
      setShowChat(true);
    }
    //reset the socket.io connection when the student group changes
  }, [studentGroup]);

  return (
    <div className="App">
      {showChat ? (
        <>
          <Chat socket={socket} username={user.uid} room={studentGroup._id} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatMenu;
