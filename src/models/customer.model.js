const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    agentName: { type: String, required: true },
    saleAmount: { type: Number },
    upgradeAmount: { type: Number },
    finalAmount: { type: Number },
    methodOfPayment: { type: String },
    issues: { type: String },
    remarks: { type: String },
    technician: { type: String },
    refund: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
