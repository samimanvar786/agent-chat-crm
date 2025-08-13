const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const envFile = `.env.${process.env.NODE_ENV || "local"}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

if (!process.env.MONGO_URI) {
  console.error(`❌ MONGO_URI is missing in ${envFile}`);
  process.exit(1);
}

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/customers", require("./routes/customer.routes"));
app.use("/api/roles", require("./routes/role.routes"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

module.exports = app;
