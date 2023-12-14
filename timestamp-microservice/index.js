require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dateRouter = require("./routes/date.route");
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api", dateRouter);

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
