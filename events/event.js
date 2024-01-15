const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const EventSchema = new mongoose.Schema({
  titlu: {
    type: String,
    unique: true,
    required: true,
  },
  descriere: {
    type: String,
    unique: true,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  locatie: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  sponsor: {
    type: Schema.Types.ObjectId,
    ref: "sponsor",
    required: false,
  },
  speaker: {
    type: Schema.Types.ObjectId,
    ref: "speaker",
    required: false,
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: "partner",
    required: false,
  },
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
