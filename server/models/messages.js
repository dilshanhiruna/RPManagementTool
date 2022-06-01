const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Msg = mongoose.model("msg", msgSchema);
module.exports = Msg;
