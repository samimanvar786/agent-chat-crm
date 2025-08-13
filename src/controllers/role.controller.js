const Role = require("../models/role.model");
const { v4: uuidv4 } = require("uuid");

// Create Role
const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // Check if role name already exists
    const exists = await Role.findOne({ name });
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "Role already exists" });

    // Generate unique roleId
    const roleId = "ROLE-" + uuidv4();

    const role = await Role.create({
      roleId,
      name,
      description,
      permissions,
    });

    res.status(201).json({
      success: true,
      data: role,
      message: "Role created successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// List Roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Role
const updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description, permissions },
      { new: true }
    );
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Role
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRole, getRoles, getRoleById, updateRole, deleteRole };
