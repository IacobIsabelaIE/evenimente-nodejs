const express = require("express");
const router = express.Router();

const { addTicketToCart, showCart, deleteFromCart} = require("./cart-controller");

router.get("/cart", showCart);
router.post("/cart/add/:ticketId", addTicketToCart);
router.post("/cart/delete/:ticketId", deleteFromCart);

module.exports = router;