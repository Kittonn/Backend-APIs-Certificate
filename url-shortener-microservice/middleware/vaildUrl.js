const checkUrl = require("valid-url");
const validUrl = (req, res, next) => {
  const { url } = req.body;
  if (checkUrl.isWebUri(url)) {
    next();
  } else {
    res.status(400).json({ error: "invalid url" });
  }
}

module.exports = validUrl