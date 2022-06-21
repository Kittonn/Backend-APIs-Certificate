const { getUrl, postUrl } = require("../controller/urlController");
const validUrl = require("../middleware/vaildUrl");
const router = require("express").Router();

router.get("/:id", getUrl);
router.post("/",validUrl, postUrl);

module.exports = router;
