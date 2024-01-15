const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
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
  activitate: {
    type: String,
    required: true,
  },
  cauza: {
    type: String,
    required: true,
  },
});

const Partner = mongoose.model("partener", PartnerSchema);
module.exports = Partner;
