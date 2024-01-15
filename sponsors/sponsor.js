const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema({
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
});

const Sponsor = mongoose.model("sponsor", SponsorSchema);
module.exports = Sponsor;
