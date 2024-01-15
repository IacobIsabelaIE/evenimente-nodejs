const Order = require('./order');
const stripe = require('stripe')('sk_test_51NFo0jDw3VpjhUMYZdgxSWKlfLjqaZLbPHIsBIT3llmcQunCd2oQ9bILgr9TcVxEasfztAvhxYrC8bhL0ZjU2gLt00rb3EwF4r');

exports.createOrder = async (req, res) => {
    
  if (!req.session.cart || req.session.cart.total == 0) {
    return res.redirect('/cart');
  }

  let bilete = req.session.cart.bilete.map(biletIndividual => biletIndividual.bilet._id);

  try {
    const order = new Order({
      total: req.session.cart.total,
      bilete: bilete
    });

    await order.save();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'ron',
            product_data: {
              name: "Bilete",
            },
            unit_amount: req.session.cart.total * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:3000`,
        cancel_url: `http://localhost:3000`,
      });

      req.session.cart = { bilete: [], total: 0 };

      res.redirect(303, session.url);

  } catch (error) {
    console.log(error);
  }
};
