const User = require("../models/user.model");

const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAgents };
