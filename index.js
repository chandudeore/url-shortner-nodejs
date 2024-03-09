const express = require("express");
const connectDB = require("./db/db");
const UrlRouter = require("./controllers/Url.controller");
// const router = require("./controllers/Url.controller");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Helllo New NodeJS PROJECT");
});
app.use("/api", UrlRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log("server is running on ", PORT);
});
