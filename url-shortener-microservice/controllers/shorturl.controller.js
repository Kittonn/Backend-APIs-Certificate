const UrlModel = require("../model/url.model");

const getUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const url = await UrlModel.findOne({ short_url: shortUrl });
    if (!url) {
      return res.status(400).json({ message: "invalid id" });
    }

    return res.status(200).redirect(url.original_url);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const postUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const shortUrlCount = await UrlModel.countDocuments();

    const newUrl = await UrlModel.create({
      original_url: url,
      short_url: shortUrlCount + 1,
    });

    return res.status(201).json({
      original_url: newUrl.original_url,
      short_url: newUrl.short_url,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUrl,
  postUrl,
};
