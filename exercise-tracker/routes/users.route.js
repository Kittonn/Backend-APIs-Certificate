const router = require("express").Router();
const {
  createUser,
  getUsers,
  createExercise,
  getLogs,
} = require("../controllers/users.controller");

router.route("/").get(getUsers).post(createUser);
router.post("/:_id/exercises", createExercise);
router.get("/:_id/logs", getLogs);

module.exports = router;
