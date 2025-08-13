const app = require("./src/app");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://localhost";

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);
  console.log(`📡 Base URL: ${HOST}:${PORT}`);
});
