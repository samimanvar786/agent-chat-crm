const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleId: { type: String, unique: true },
    name: { type: String, required: true, unique: true }, // e.g. Admin, Agent, Customer
    description: { type: String },
    permissions: [{ type: String }], // optional: ["create_user", "delete_customer"]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
