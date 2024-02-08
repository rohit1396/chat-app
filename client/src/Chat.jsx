import React, { useEffect, useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [curentMessage, setCurrentMessage] = useState("");
  const [messageDetails, setMessageDetails] = useState([]);

  const sendMessage = async () => {
    if (curentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: curentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        id: (
          new Date(Date.now()).getMinutes() +
          new Date(Date.now()).getMilliseconds()
        ).toString(),
      };
      await socket.emit("send_message", messageData);
      setMessageDetails((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageDetails((list) => {
        return [...list, data];
      });
    });

    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className="h-4/6 w-1/4 border rounded-md bg-cyan-100 flex flex-col relative">
      <div className="w-full h-16 bg-cyan-200 text-slate-50 text-4xl font-bold text-center flex items-center px-5">
        Chat Header
      </div>
      <div className="w-full h-3/4 border border-red-400 overflow-y-scroll">
        {messageDetails.map((item) => {
          return (
            <div
              key={item.id}
              className="max-w-4/5 w-fit h-auto min-h-10 bg-cyan-400 rounded-md mx-2 my-2 py-1 px-4"
            >
              <p>{item.message}</p>
              <div>{item.time}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full my-1 mx-1 absolute bottom-0 text-start pl-2">
        <input
          type="text"
          placeholder="Enter Room Id..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="h-12 w-3/4"
        />
        <button
          onClick={sendMessage}
          className="bg-emerald-600 h-12 w-1/5 mx-0 my-auto"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
