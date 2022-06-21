const Url = require("../model/urlModel");
const getUrl = async (req, res) => {
  const { id } = req.params;
  const url = await Url.findOne({ short_url: id });
  if (!url) {
    return res.status(400).json({ error: "invalid id" });
  }
  res.status(200).redirect(url.original_url);
}

const postUrl = async (req, res) => {
  const { url } = req.body;
  const newUrl = await Url.create({
    original_url: url,
    short_url: (await Url.countDocuments()) + 1,
  });
  res.status(200).json({
    original_url: newUrl.original_url,
    short_url: newUrl.short_url,
  });
}

module.exports = {
  getUrl,postUrl
};
