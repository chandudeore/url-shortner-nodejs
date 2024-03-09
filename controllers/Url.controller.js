const express = require("express");
// const nanoID = require("nanoid");
const { nanoid } = import("nanoid");
const URL = require("../models/Url");
const validateUrl = require("../utils/utils");
require("dotenv").config();

const router = express.Router();

//short URL Generator
const UrlRouter = router.post("/short-url", async (req, res) => {
  const origUrl = req.body;
  const base = process.env.BASE;

  const urlID = nanoid;
  console.log("original url", origUrl);
  if (validateUrl(origUrl)) {
    try {
      let url = await URL.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlID}`;
        url = new URL({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(500).json("Invalid Original Url");
  }
});

module.exports = UrlRouter;
