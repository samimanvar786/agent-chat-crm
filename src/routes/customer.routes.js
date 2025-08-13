const express = require("express");
const router = express.Router();
const { createCustomer, searchCustomersByPhone } = require("../controllers/customer.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// Only agent can create/search customers
router.post("/", protect, authorizeRoles("agent"), createCustomer);
router.get("/search", protect, authorizeRoles("agent"), searchCustomersByPhone);

module.exports = router;
