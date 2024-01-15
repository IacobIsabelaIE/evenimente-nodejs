const express = require("express");
const router = express.Router();
const { registerAdministrator, loginAdministrator, newRegisterForm, loginForm, logout} = require("./auth-controller");

router.get("/register", newRegisterForm);
router.post("/register", registerAdministrator);
router.get("/login", loginForm);
router.post("/login", loginAdministrator);
router.get("/logout", logout);

module.exports = router;
