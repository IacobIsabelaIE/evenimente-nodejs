const express = require("express");
const router = express.Router();
const { verificaUtilizatorLogat } = require("./authentication/auth-controller");

// Adaugă importul pentru funcționalitatea coșului
const cartController = require("./cart/cart-controller");

async function showHomeView(req, res) {
  try {
    const user = verificaUtilizatorLogat(req);
    res.render('home', { user: user });
  } catch (error) {
    res.status(500).send({ message: "EROARE!", error: error.message });
  }
}

// Adaugă o nouă rută pentru afișarea paginii coșului
router.get("/cart", cartController.showCartView);

// Ruta existentă pentru pagina principală
router.get("/", showHomeView);

module.exports = router;
