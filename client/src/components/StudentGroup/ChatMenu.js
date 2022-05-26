import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5002");

function ChatMenu({ studentGroup, user }) {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  // useEffect(() => {
  //   if (username !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //   }
  // }, []);

  const joinRoom = () => {
    if (username !== "" && studentGroup._id !== "") {
      socket.emit("join_room", studentGroup._id);
      setShowChat(true);
    }
  };

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
          {/* <input
            type="text"
            value={room}
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          /> */}
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <div>
          <h1>Group Chat</h1>
          <Chat socket={socket} username={username} room={studentGroup._id} />
        </div>
      )}
    </div>
  );
}

export default ChatMenu;

// import io from "socket.io-client";
// import { useEffect, useState } from "react";
// import Chat from "./Chat";

// const socket = io.connect("http://localhost:5002");

// function ChatMenu({ studentGroup, user }) {
//   const [showChat, setShowChat] = useState(false);

//   useEffect(() => {
//     if (user.uid !== "" && studentGroup._id !== "") {
//       socket.emit("join_room", studentGroup._id);
//       setShowChat(true);
//     }
//   }, []);

//   return (
//     <div className="App">
//       {showChat ? (
//         <Chat socket={socket} username={user.uid} room={studentGroup._id} />
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// export default ChatMenu;
