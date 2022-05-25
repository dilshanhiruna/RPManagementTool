import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5001");

function ChatMenu({ studentGroup, user }) {
  const [username, setUsername] = useState(user.uid);
  const [room, setRoom] = useState(studentGroup._id);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }, []);

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatMenu;
