const { Schema, model } = require("mongoose");

const logSchema = Schema({
  username: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, required: true },
  count: { type: Number, required: true },
  log: { type: [Object], required: true },
});

module.exports = model("Log", logSchema);
