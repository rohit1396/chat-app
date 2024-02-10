import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("https://chat-app-ta1e.onrender.com/");

const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShow(true);
    }
  };
  return (
    <div className="bg-teal-50 h-screen w-full flex justify-center items-center">
      {!show ? (
        <div className="h-3/5 w-2/3 md:max-w-md flex flex-col justify-evenly items-center border rounded-md bg-emerald-100">
          <h2 className="text-center text-4xl font-bold my-2 text-emerald-600">
            Join Chat
          </h2>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setUserName(e.target.value)}
            className="w-4/5 h-16 text-2xl text-center border border-sm border-emerald-200 rounded-md outline-none"
          />
          <input
            type="text"
            placeholder="Enter Room Id..."
            onChange={(e) => setRoom(e.target.value)}
            className="w-4/5 h-16 text-2xl text-center border border-sm border-emerald-200 rounded-md outline-none"
          />
          <button
            onClick={joinRoom}
            className="text-center bg-emerald h-16 w-4/5 bg-emerald-400 hover:bg-emerald-300 rounded-md text-slate-100 font-bold text-2xl"
          >
            Join{" "}
          </button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
};

export default App;
