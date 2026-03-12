require("dotenv").config();
const mongoose = require("mongoose");

let connectingPromise = null;

module.exports = async function connectDb() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("Missing database URI. Set MONGODB_URI in environment variables.");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connectingPromise) {
    await connectingPromise;
    return;
  }

  connectingPromise = mongoose.connect(mongoUri);

  try {
    await connectingPromise;
  } finally {
    connectingPromise = null;
  }
};
