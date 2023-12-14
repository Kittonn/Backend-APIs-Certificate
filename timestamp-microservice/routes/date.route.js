const router = require("express").Router();
const { nowDate, getDate } = require("../controllers/date.controller");

router.get("/", nowDate);
router.get("/:date", getDate);

module.exports = router;
