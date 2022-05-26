const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  gid: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

const Msg = mongoose.model("msg", msgSchema);
module.exports = Msg;
