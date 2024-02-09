import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";

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
      setCurrentMessage("");
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
      {/* Chat Header */}
      <div className="w-full h-16 bg-cyan-200 text-slate-50 text-4xl font-bold text-center flex items-center px-5">
        Chat Header
      </div>
      {/* Chat Body */}
      <div className="w-full h-3/4 overflow-y-auto">
        <ScrollToBottom className="w-full h-full">
          {messageDetails.map((item) => {
            return (
              <div
                key={item.id}
                className="max-w-4/5 w-fit h-auto min-h-10 relative my-4"
              >
                <div
                  className={`border border-2 border-red-400 flex w-11/12 min-h-10 text-slate-50 text-base font-light rounded-md mx-2 my-2 py-1 px-3 flex ${
                    userName === item.author
                      ? "bg-cyan-400 justify-center"
                      : "bg-emerald-400 justify-end"
                  } `}
                >
                  {/* message */}
                  <div
                  // className={`w-11/12 min-h-10 text-slate-50 text-base font-light rounded-md mx-2 my-2 py-1 px-3 flex ${
                  //   userName === item.author
                  //     ? "bg-cyan-400 justify-center"
                  //     : "bg-emerald-400 justify-end"
                  // } `}
                  >
                    <p>{item.message}</p>
                  </div>
                  {/* message details */}
                  <div className="w-max absolute bottom-[-8px] left-2 text-xs font-thin flex">
                    <p className="mx-1">{item.time}</p>
                    <p>{item.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      {/* Chat Footer */}
      <div className="w-full bg-cyan-400 border-t py-1 px-1 absolute bottom-0 text-start pl-2 flex justify-around">
        <input
          type="text"
          placeholder="Type Message Here..."
          value={curentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="h-12 w-4/5 rounded-3xl px-3 outline-none border border-slate-100"
        />
        <div className="w-1/6 h-12 rounded-full bg-slate-50 flex justify-center items-center mx-2 my-auto">
          <IoMdSend
            onClick={sendMessage}
            className=" text-cyan-500 w-4/6 h-4/6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
