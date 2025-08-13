const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createRole);
router.get("/", protect, authorizeRoles("admin"), getRoles);
router.get("/:id", protect, authorizeRoles("admin"), getRoleById);
router.put("/:id", protect, authorizeRoles("admin"), updateRole);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRole);

module.exports = router;
