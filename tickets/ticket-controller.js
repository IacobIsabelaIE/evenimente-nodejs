const Ticket = require("./ticket");
const Eveniment = require("../events/event");
const {verificaUtilizatorLogat} = require("../authentication/auth-controller");

exports.getAllTickets = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    const tickets = await Ticket.find({}).populate({
      path: "eveniment",
      model: Eveniment,
    });
    res.render('list-ticket', { tickets: tickets, user: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.newTicketForm = async (req, res) => {
  const user = verificaUtilizatorLogat(req);
  const events = await Eveniment.find({});
  if (!user) {
    res.redirect("/tickets");
  } else {
    res.render('form-ticket', { events: events, ticket: null, user: user });
  }
};

exports.createTicket = async (req, res) => {
  const { pret, eveniment } = req.body;
  console.log(pret);
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/ticket");
  }
  try {
    const newTicket = new Ticket({ pret, eveniment });
    await newTicket.save();
    res.redirect("/ticket");
  } catch (error) {
    console.log(error);
  }
};
