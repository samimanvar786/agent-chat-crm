const express = require("express");
const router = express.Router();
const { getAgents } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// Only admin can list agents
router.get("/", protect, authorizeRoles("admin"), getAgents);

module.exports = router;
