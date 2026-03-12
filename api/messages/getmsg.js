const connectDb = require("../_lib/connectDb");
const { getMessages } = require("../../server/controllers/messageController");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    await connectDb();
    return getMessages(req, res, (error) =>
      res.status(500).json({ msg: error.message || "Internal server error" })
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message || "Internal server error" });
  }
};
