require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`app is running on http://localhost:${process.env.PORT}`);
});

app.get("/api/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Hello from the server",
    message: "Server is running",
  });
});
