const express = require("express");
const router = express.Router();

const {createOrder} = require("./order-controller");

router.post("/order/new", createOrder);

module.exports = router;