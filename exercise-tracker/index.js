const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./db/connectDB");
const User = require("./model/userModel");
const Exercise = require("./model/exerciseModel");
const Log = require("./model/logModel");

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

app.post("/api/users", async (req, res) => {
  const { username } = req.body;
  const user = await User.create(req.body);
  res.status(200).json({
    username: user.username,
    _id: user._id,
  });
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  let { duration, description, date } = req.body;
  const user = await User.findOne(req.params);

  if (!user) {
    res.status(400).json({ error: "No user" });
  }

  if (date === "" || date === undefined) {
    date = new Date().getTime();
  }
  date = new Date(date).toDateString();
  const userLog = await Log.findOne({ userid: req.params._id });
  if (!userLog) {
    const newLog = await Log.create({
      userid: req.params._id,
      username: user.username,
      count: 1,
      log: [{ description, duration: Number(duration), date }],
    });
    console.log(newLog);
  } else {
    const updateLog = await Log.findByIdAndUpdate(userLog._id, {
      $push: {
        log: { description, duration: Number(duration), date },
      },
      $inc: {
        count: 1,
      },
    });
  }
  res.status(200).json({
    _id: user._id,
    username: user.username,
    date,
    duration: Number(duration),
    description,
  });
});

app.get("/api/users/:id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const log = await Log.findOne({ userid: req.params.id });
  let log_arr = log.log;
  if (from && !to) {
    // Test Case ท้าย 😭
  }
  if (to && !from) {
    // Test Case ท้าย 😭
  }
  if (to && from) {
    // Test Case ท้าย 😭
  }
  if (limit) {
    // Test Case ท้าย 😭
  }
  res.status(200).json({
    _id: req.params.id,
    username: log.username,
    count: log_arr.length,
    log: log_arr,
  });
});

app.get("/test", (req, res) => {
  console.log(new Date("Sat Jan 01 2022").getTime());
  res.send("text");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
