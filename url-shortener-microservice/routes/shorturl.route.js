const { getUrl, postUrl } = require("../controllers/shorturl.controller");
const validUrl = require("../middleware/valid-url.middleware");
const router = require("express").Router();

router.get("/:shortUrl", getUrl);
router.post("/",validUrl, postUrl);

module.exports = router;
