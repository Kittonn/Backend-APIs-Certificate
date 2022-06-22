const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./db/connectDB");
const User = require("./model/userModel");
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
  date = new Date(date).getTime();

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
    date: new Date(date).toDateString(),
    duration: Number(duration),
    description,
  });
});

app.get("/api/users/:id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const log = await Log.findOne({ userid: req.params.id });
  let log_arr = log.log;

  if (from && !to) {
    log_arr = log_arr.filter((item) => {
      let fDate = Date.parse(from);
      let bDate = Date.parse(new Date(item.date).toISOString().slice(0, 10));
      return bDate >= fDate;
    });
  }

  if (!from && to) {
    log_arr = log_arr.filter((item) => {
      let tDate = Date.parse(to);
      let bDate = Date.parse(new Date(item.date).toISOString().slice(0, 10));
      return bDate <= tDate;
    });
  }

  if (from && to) {
    log_arr = log_arr.filter((item) => {
      let tDate = Date.parse(to);
      let fDate = Date.parse(from);
      let bDate = Date.parse(new Date(item.date).toISOString().slice(0, 10));
      return bDate >= fDate && bDate <= tDate;
    });
  }

  if (limit && limit != 0) {
    log_arr = log_arr.slice(0, limit);
  }

  log_arr = log_arr.map((item) => ({
    ...item,
    date: new Date(item.date).toDateString(),
  }));
  res.status(200).json({
    _id: req.params.id,
    username: log.username,
    count: log_arr.length,
    log: log_arr,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
