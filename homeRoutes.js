const express = require("express");
const router = express.Router();
const { verificaUtilizatorLogat } = require("./authentication/auth-controller");

async function showHomeView(req, res) {
  try {
    const user = verificaUtilizatorLogat(req);
    res.render('home', { user: user });
  } catch (error) {
    res.status(500).send({ message: "EROARE!", error: error.message });
  }
}

router.get("/", showHomeView);

module.exports = router;
