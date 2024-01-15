const express = require("express");
const router = express.Router();
const { getBileteCart, addTicketToCart } = require("./cart-controller");

router.get("/cart", getBileteCart);
router.post("/cart/:ticketId", addTicketToCart);

module.exports = router;
