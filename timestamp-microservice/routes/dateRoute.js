const router = require("express").Router();
const { nowDate, singleDate } = require("../controllers/dateController");
router.get("/", nowDate);
router.get("/:date", singleDate);

module.exports = router;
