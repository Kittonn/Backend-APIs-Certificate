const checkUrl = require("valid-url");
const validUrl = (req, res, next) => {
  if (checkUrl.isWebUri(req.body.url)) {  
    next();
  } else {
    res.status(200).json({ error: "invalid url" });
  }
}

module.exports = validUrl