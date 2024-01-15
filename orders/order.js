const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  bilete: [{
    type: Schema.Types.ObjectId,
    ref: "ticket",
    required: true,
  }],
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
