require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const urlRouter = require("./routes/urlRoute");
const connectDB = require("./db/connectDB")
connectDB()
app.use(cors());
app.use(express.json());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use("/api/shorturl", urlRouter);
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
