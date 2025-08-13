const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

// For first admin, no auth required. Controller handles it
router.post("/register", protectOptional, registerUser);

// Login
router.post("/login", loginUser);

// Optional protect middleware for first admin
function protectOptional(req, res, next) {
  if (req.headers.authorization) {
    return require("../middleware/auth.middleware").protect(req, res, next);
  }
  next();
}

module.exports = router;
