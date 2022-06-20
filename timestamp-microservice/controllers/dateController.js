const singleDate = (req, res) => {
  const { date } = req.params;
  let pattern = /^\d*$/;

  let time = pattern.test(date) ? new Date(Number(date)) : new Date(date);

  if (time.toString() === "Invalid Date") {
    res.status(200).json({ error: time.toString() });
  } else {
    res.status(200).json({
      unix: time.getTime(),
      utc: time.toUTCString(),
    });
  }
};

const nowDate = (req, res) => {
  res.status(200).json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
};

module.exports = { nowDate, singleDate };
