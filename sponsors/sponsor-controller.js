const Sponsor = require("./sponsor");
const {verificaUtilizatorLogat} = require("../authentication/auth-controller");


exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({});
    const user = verificaUtilizatorLogat(req);
    res.render('list-sponsors', { sponsors: sponsors, user: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.newSponsorForm = (req, res) => {
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/sponsor");
  } else {
    res.render('form-sponsor', { sponsor: null, user: user });
  }
};


exports.addSponsor = async (req, res) => {
  const { nume, descriere } = req.body;
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/sponsor");
  }
  try {
    const newSponsor = new Sponsor({ nume, descriere });
    await newSponsor.save();
    res.redirect('/sponsor');
  } catch (error) {
    console.log(error);
  }
};


exports.editSponsorForm = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/sponsor");
    }
    const sponsor = await Sponsor.findById(req.params.sponsorId);
    if (!sponsor) {
      res.redirect('/sponsor');
    } else {
      res.render('form-sponsor', { sponsor: sponsor, user: user });
    }
  } catch (error) {
    res.status(500).redirect('/sponsor');
  }
};


exports.editSponsor = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/sponsor");
    }
    await Sponsor.findByIdAndUpdate(req.params.sponsorId, req.body);
    res.redirect('/sponsor');
  } catch (error) {
    res.status(400).render('form-sponsor', { sponsor: req.body, error: error.message, user: user });
  }
};

exports.deleteSponsor = async (req, res) => {
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/sponsor");
  }
  try {
    await Sponsor.findByIdAndDelete(req.params.sponsorId);
    res.redirect('/sponsor');
  } catch (error) {
    res.status(500).redirect('/sponsor');
  }
};