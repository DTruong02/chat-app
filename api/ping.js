const connectDb = require("./_lib/connectDb");

module.exports = async function handler(_req, res) {
  try {
    await connectDb();
    return res.status(200).json({ msg: "Ping Successful" });
  } catch (error) {
    return res.status(500).json({ msg: error.message || "Internal server error" });
  }
};
