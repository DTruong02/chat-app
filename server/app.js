const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());

globalThis.onlineUsers = globalThis.onlineUsers || new Map();

let isDbConnected = false;

const connectDatabase = async () => {
  if (isDbConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;

  if (!mongoUri) {
    console.error("Missing database URI. Set MONGODB_URI in environment variables.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    isDbConnected = true;
    console.log("DB Connection Successful");
  } catch (error) {
    console.error(error.message);
  }
};

connectDatabase();

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;