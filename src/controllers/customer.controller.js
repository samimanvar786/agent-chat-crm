const Customer = require("../models/customer.model");

// Create Customer (Agent only)
const createCustomer = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      saleAmount,
      upgradeAmount,
      finalAmount,
      methodOfPayment,
      issues,
      remarks,
      technician,
      refund,
    } = req.body;

    const customer = await Customer.create({
      name,
      phone,
      email,
      address,
      agentName: req.user.name,
      saleAmount,
      upgradeAmount,
      finalAmount,
      methodOfPayment,
      issues,
      remarks,
      technician,
      refund,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: customer,
      message: "Customer created successfully",
    });
  } catch (err) {
    console.error("Create Customer Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Search Customers by phone (Agent only)
const searchCustomersByPhone = async (req, res) => {
  try {
    const { digits } = req.query;
    const regex = new RegExp(digits + "$");
    const customers = await Customer.find({
      phone: regex,
      createdBy: req.user._id,
    });

    res.json({
      success: true,
      data: customers,
      message: "Customers fetched successfully",
    });
  } catch (err) {
    console.error("Search Customer Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = { createCustomer, searchCustomersByPhone };
