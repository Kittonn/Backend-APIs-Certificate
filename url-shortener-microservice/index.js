require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./db/connectDB");

const port = process.env.PORT || 3000;

const router = require("./routes/urlRoute");
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api/shorturl", router);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
