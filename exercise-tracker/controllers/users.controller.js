const UserModel = require("../model/user.model");
const LogModel = require("../model/log.model");

const createUser = async (req, res) => {
  try {
    const { username, _id } = await UserModel.create(req.body);
    return res.status(201).json({ username, _id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-__v");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createExercise = async (req, res) => {
  try {
    const { duration, description, date } = req.body;
    const user = await UserModel.findOne(req.params);

    if (!user) {
      return res.status(400).json({ message: "No user" });
    }

    date = date ? new Date(date).getTime() : new Date().getTime();

    const userLog = await LogModel.findOne({ user: req.params._id });

    if (!userLog) {
      await LogModel.create({
        user: req.params._id,
        count: 1,
        log: [{ description, duration: Number(duration), date }],
      });
    } else {
      await LogModel.findByIdAndUpdate(userLog._id, {
        $push: {
          log: { description, duration: Number(duration), date },
        },
        $inc: {
          count: 1,
        },
      });
    }

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      date: date.toDateString(),
      duration: Number(duration),
      description,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLogs = async (req, res) => {
  try {
    const { from, to, limit } = req.query;

    const log = await LogModel.findOne({ user: req.params.id });

    if (!log) {
      return res.status(400).json({ message: "No log" });
    }

    const { _id, username, count, log: logs } = log;

    let filteredLogs = logs;

    if (from) {
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.date).getTime() >= new Date(from).getTime()
      );
    }

    if (to) {
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.date).getTime() <= new Date(to).getTime()
      );
    }

    if (limit) {
      filteredLogs = filteredLogs.slice(0, Number(limit));
    }

    return res.status(200).json({
      _id,
      username,
      count,
      log: filteredLogs.map((log) => ({
        description: log.description,
        duration: log.duration,
        date: new Date(log.date).toDateString(),
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createUser, getUsers, createExercise, getLogs };
