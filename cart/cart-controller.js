const Ticket = require("../tickets/ticket");
const Eveniment = require("../events/event");
const {verificaUtilizatorLogat} = require("../authentication/auth-controller");

exports.addTicketToCart = async (req, res) => {
  const user = verificaUtilizatorLogat(req);

  if (!req.session.cart) {
    req.session.cart = { bilete: [], total: 0 };
  }

  try {
    const bilet = await Ticket.findById(req.params.ticketId).populate({
      path: "eveniment",
      model: Eveniment,
    });

    if (bilet) {
      let biletExistentInCos = false;

      req.session.cart.bilete.forEach(ticket => {
        if (ticket.bilet._id.toString() === bilet._id.toString()) {
          ticket.cantitate += 1;
          biletExistentInCos = true;
        }
      });

      if (!biletExistentInCos) {
        req.session.cart.bilete.push({
          bilet: bilet,
          cantitate: 1
        });
      }

      req.session.cart.total = 0;

      req.session.cart.bilete.forEach(bilet => {
        req.session.cart.total += bilet.bilet.pret * bilet.cantitate;
      });

      res.render('list-cart', { cart: req.session.cart, user: user });
    }

  } catch (error) {
    console.log(error.message);
  }
};

exports.showCart = async (req, res) => {
  const user = verificaUtilizatorLogat(req);
  let cartArray = { bilete: [], total: 0 };
  if (req.session.cart) {
    cartArray = req.session.cart
  }
  res.render('list-cart', {cart:cartArray, user: user});
};


exports.deleteFromCart = async (req, res) => {

  if (!req.session.cart) {
    req.session.cart = { bilete: [], total: 0 };
  }

  const biletId = req.params.ticketId;
  const cart = req.session.cart;

  cart.bilete = cart.bilete.filter(item => item.bilet._id.toString() !== biletId);

  cart.total = cart.bilete.reduce((total, item) => total + item.bilet.pret * item.cantitate, 0);

  res.redirect('/cart');
};

