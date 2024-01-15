const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TicketSchema = new mongoose.Schema({
  pret: {
    type: Number,
    required: true,
  },
  eveniment: {
    type: Schema.Types.ObjectId,
    ref: "event",
    required: false,
  },
});

const Ticket = mongoose.model("ticket", TicketSchema);
module.exports = Ticket;
