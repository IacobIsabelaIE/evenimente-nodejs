const Partner = require("./partner");
const {verificaUtilizatorLogat} = require("../authentication/auth-controller");

exports.getAllPartners = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    const partners = await Partner.find({});
    res.render('list-partener', { partners: partners, user: user });
  } catch (error) {
    res.status(500).send({ message:"EROARE!", error: error.message });
  }
};

exports.newPartnerForm = (req, res) => {
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect('/partener')
  } else {
    res.render('form-partener', { partener: null, user: user });
  }
};

exports.addPartner = async (req, res) => {
  const { nume, descriere, activitate, cauza } = req.body;
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect("/partener");
  }
  try {
    const newPartner = new Partner({ nume, descriere, activitate, cauza });
    await newPartner.save();
    res.redirect('/partener');
  } catch (error) {
    res.status(500).send({ message:"EROARE!", error: error.message });
  }
};

exports.editPartnerForm = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/partener");
    }
    const partener = await Partner.findById(req.params.partenerId);
    if (!partener) {
      res.redirect('/partener');
    } else {
      res.render('form-partener', { partener: partener, user: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/partener');
  }
};

exports.editPartner = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/partener");
    }
    await Partner.findByIdAndUpdate(req.params.partenerId, req.body);
    res.redirect('/partener');
  } catch (error) {
    res.status(400).render('form-speaker', { user: user, sponsor: req.body, error: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/partener");
    }
    await Partner.findByIdAndDelete(req.params.partenerId);
    res.redirect('/partener');
  } catch (error) {
    res.status(500).redirect('/partener');
  }
};
