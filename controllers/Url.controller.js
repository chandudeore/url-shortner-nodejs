const express = require("express");
const { v4: uuidv4 } = require("uuid");
const URL = require("../models/Url");
const validateUrl = require("../utils/utils");
require("dotenv").config();

const router = express.Router();

//short URL Generator
router.post("/short-url", async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = uuidv4();
  if (validateUrl(origUrl)) {
    try {
      let url = await URL.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

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
    res.status(400).json("Invalid Original Url");
  }
});

module.exports = router;
