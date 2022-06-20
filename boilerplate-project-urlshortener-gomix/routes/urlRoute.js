const { getUrl, newUrl } = require("../controllers/urlController");
const checkUrl = require("../middleware/validUrl");
const router = require("express").Router();

router.get("/:id", getUrl);
router.post("/", checkUrl, newUrl);

module.exports = router;
