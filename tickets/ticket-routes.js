const express = require("express");
const router = express.Router();
const { getAllTickets, newTicketForm, createTicket } = require("./ticket-controller");

router.get("/ticket", getAllTickets);
router.get("/ticket/new", newTicketForm);
router.post("/ticket", createTicket);

module.exports = router;
