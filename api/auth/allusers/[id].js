const connectDb = require("../../_lib/connectDb");
const { getAllUsers } = require("../../../server/controllers/userController");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  const userId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  req.params = { id: userId };

  try {
    await connectDb();
    return getAllUsers(req, res, (error) =>
      res.status(500).json({ msg: error.message || "Internal server error" })
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message || "Internal server error" });
  }
};
