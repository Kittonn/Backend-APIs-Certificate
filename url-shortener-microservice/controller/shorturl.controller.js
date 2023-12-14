const Url = require("../model/url.model");

const getUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const url = await Url.findOne({ short_url: shortUrl });
    if (!url) {
      return res.status(400).json({ error: "invalid id" });
    }

    return res.status(200).redirect(url.original_url);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const postUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const shortUrlCount = await Url.countDocuments();

    const newUrl = await Url.create({
      original_url: url,
      short_url: shortUrlCount + 1,
    });

    return res.status(200).json({
      original_url: newUrl.original_url,
      short_url: newUrl.short_url,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUrl,
  postUrl,
};
