const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema({
  nume: {
    type: String,
    unique: true,
    required: true,
  },
  descriere: {
    type: String,
    unique: true,
    required: true,
  },
  ocupatie: {
    type: String,
    unique: true,
    required: true,
  },
  subiect_abordat: {
    type: String,
    unique: true,
    required: true,
  },
});

const Speaker = mongoose.model("speaker", SpeakerSchema);
module.exports = Speaker;
