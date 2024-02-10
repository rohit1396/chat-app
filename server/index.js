require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-app-rg.vercel.app/"],
    methods: ["GET", "POST"],
  })
);

const port = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-rg.vercel.app/"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID : ${socket.id} join room : ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected");
  });
});

server.listen(port, () => console.log(`server running on port : ${port}`));
