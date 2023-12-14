const getDate = (req, res) => {
  try {
    const { date } = req.params;

    let pattern = /^\d*$/;

    let time = pattern.test(date) ? new Date(Number(date)) : new Date(date);

    if (time.toString() === "Invalid Date") {
      return res.status(200).json({ error: "Invalid Date" });
    }

    return res.status(200).json({
      unix: time.getTime(),
      utc: time.toUTCString(),
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const nowDate = (req, res) => {
  try {
    return res.status(200).json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { nowDate, getDate };
