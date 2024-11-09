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

  const urlId = uuidv4().slice(0, 3);
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

router.get("/all-urls", async (req, res) => {
  try {
    const getAll = await URL.find();
    return res.status(200).json(getAll);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:urlId", async (req, res) => {
  try {
    const url = await URL.findOne({ urlId: req.params.urlId });
    if (url) {
      await URL.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
