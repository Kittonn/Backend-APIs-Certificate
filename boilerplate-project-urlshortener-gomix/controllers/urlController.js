const Url = require("../models/urlModel");
const asyncHandler = require("express-async-handler");

const newUrl = asyncHandler(async (req, res) => {
  const oldUrl = await Url.findOne(req.body);

  if (oldUrl) {
    return res.status(200).json({
      original_url: oldUrl["original_url"],
      short_url: oldUrl["short_url"],
    });
  } else {
    const length = await Url.countDocuments();
    const url = await Url.create({
      ...req.body,
      short_url: length + 1,
    });
    res.status(200).json(url);
  }
});

const getUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = await Url.findOne({ short_url: Number(id) });

  if (!url) {
    return res.status(400).json({
      error: "Wrong format",
    });
  }

  res.status(200).json(url);
});

module.exports = { newUrl, getUrl };
