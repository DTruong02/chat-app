const { logOut } = require("../../../server/controllers/userController");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  const userId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  req.params = { id: userId };

  return logOut(req, res, (error) =>
    res.status(500).json({ msg: error.message || "Internal server error" })
  );
};
