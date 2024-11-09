const express = require("express");
const connectDB = require("./db/db");
const UrlRouter = require("./controllers/Url.controller");
const path = require("path");
require("dotenv").config();

const app = express();

const buildPath = path.join(__dirname, "dist");

app.use(express.static(buildPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

// app.get("/", (req, res) => {
//   res.send("Helllo New NodeJS PROJECT");
// });
app.use("/api", UrlRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, async () => {
  await connectDB();
  console.log("server is running on ", PORT);
});
