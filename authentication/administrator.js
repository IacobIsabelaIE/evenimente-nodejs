const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  nume: {
    type: String,
    required: false,
  },
  prenume: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const Administrator = mongoose.model("administrator", AdministratorSchema);
module.exports = Administrator;
