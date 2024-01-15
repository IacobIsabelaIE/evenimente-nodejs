const Administrator = require("./administrator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const KEY = "62fg3the21dd2441231628d84e96d10fbc04700770d572af3dce43625dd";

function verificaUtilizatorLogat(req) {
  let token = req.cookies.JWT;
  if (!token) {
    return null;
  }
  let user;
  try {
    user = jwt.verify(token, KEY);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function newRegisterForm(req, res) {
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/login");
  }
  res.render('form-register', {user: user, succesMessage: null});
}

async function loginForm(req, res) {
  const user = verificaUtilizatorLogat(req);
  if (user == null) {
    return res.render('form-login', {user: user, succesMessage: null});
  }
  else {
    return res.redirect('/');
  }
}

async function registerAdministrator(req, res, next) {
  const { username, email, nume, prenume, password } = req.body;
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/login");
  }
  if (password.length < 8) {
    return res.render("error-page", {error: "EROARE! Parola nu poate sa fie mai mica de 8 caractere!"});
  }

  const administratorExistent = await Administrator.findOne({
    email: email,
  });

  if (administratorExistent) {
    return res.render("error-page", {error: "Administratorul cu acest e-mail exista deja!"});
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Administrator({username, email, nume, prenume, password: hashedPassword});
    await admin.save();
    return res.render("form-register", {succesMessage: "Administratorul a fost adaugat cu succes!"});
  } catch (err) {
    return res.render("error-page", {error: `EROARRE! ${err}`});
  }
}

async function loginAdministrator(req, res) {
  const { username, password } = req.body;
  const user = verificaUtilizatorLogat(req);

  if (!username || !password) {
    return res.render("error-page", {error: "Username-ul sau parola nu au fost introduse in formular!"});
  }

  const administratorExistent = await Administrator.findOne({
    username: username,
  });

  if (!administratorExistent) {
    return res.render("error-page", {error: "Administratorul nu exista!"});
  }

  try {
    const userValidat = bcrypt.compare(password, administratorExistent.password);
    if (userValidat) {
      const token = jwt.sign(
        {
          id: administratorExistent._id,
          username: username,
          email: administratorExistent.email,
          nume: administratorExistent.nume,
          prenume: administratorExistent.prenume,
        },
        KEY,
        { expiresIn: 10800 }
      );
      res.cookie("JWT", token, {
        httpOnly: true,
        maxAge: 10800 * 1000,
      });
      res.redirect("/");         
    } else {
      res.render("error-page", {error: "Parola nu e buna!"});
    }
  } catch (error) {
    return res.render("error-page", {error: error});
  }
}

async function logout (req, res) {
  res.clearCookie("JWT");
  res.redirect("/login");
};

module.exports = {
  verificaUtilizatorLogat,
  newRegisterForm,
  loginForm,
  registerAdministrator,
  loginAdministrator,
  logout
};
