const validUrl = require('valid-url')
const checkUrl = (req,res,next) => {
  if (validUrl.isWebUri(req.body.original_url)) {
    next()
  } else {
    res.status(400).json({error: 'invalid url'})
  }
}

module.exports = checkUrl