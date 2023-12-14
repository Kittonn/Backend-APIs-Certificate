const checkUrl = require("valid-url");

const validUrl = (req, res, next) => {
  try {
    if (checkUrl.isWebUri(req.body.url)) {
      next();
    } else {
      return res.status(400).json({
        error: "invalid URL",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = validUrl;
