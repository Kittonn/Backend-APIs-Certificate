const { Schema, model } = require("mongoose");

const urlSchema = Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: Number,
    required: true,
  },
});

module.exports = model("Url",urlSchema)
