const { Schema, model } = require("mongoose");

const logSchema = Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  count: { type: Number, required: true },
  log: {
    type: [
      {
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
    required: true,
  },
});

module.exports = model("Log", logSchema);
