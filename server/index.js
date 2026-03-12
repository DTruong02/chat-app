require("dotenv").config();
const app = require("./app");
const socket = require("socket.io");

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on ${port}`)
);
const io = socket(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  },
});

globalThis.onlineUsers = globalThis.onlineUsers || new Map();
io.on("connection", (socket) => {
  globalThis.chatSocket = socket;
  socket.on("add-user", (userId) => {
    globalThis.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = globalThis.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
