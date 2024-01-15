const Speaker = require("./speaker");
const {verificaUtilizatorLogat} = require("../authentication/auth-controller");

exports.getAllSpeakers = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    const speakers = await Speaker.find({});
    res.render('list-speakers', { speakers: speakers, user: user });
  } catch (error) {
    res.status(500).send({ message:"EROARE!", error: error.message });
  }
};

exports.newSpeakerForm = (req, res) => {
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect('/speaker')
  } else {
    res.render('form-speaker', { speaker: null, user: user });
  }
};

exports.addSpeaker = async (req, res) => {
  const { nume, descriere, ocupatie, subiect_abordat } = req.body;
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect('/speaker');
  }
  try {
    const newSpeaker = new Speaker({ nume, descriere, ocupatie, subiect_abordat });
    await newSpeaker.save();
    res.redirect('/speaker');
  } catch (error) {
    res.status(500).send({ message:"EROARE!", error: error.message });
  }
};

exports.editSpeakerForm = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.speakerId);
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect('/speaker');
    }
    if (!speaker) {
      res.redirect('/speaker');
    } else {
      res.render('form-speaker', { speaker: speaker, user: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/speaker');
  }
};

exports.editSpeaker = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect('/speaker');
    }
    await Speaker.findByIdAndUpdate(req.params.speakerId, req.body);
    res.redirect('/speaker');
  } catch (error) {
    res.status(400).render('form-speaker', { sponsor: req.body, error: error.message, user: user });
  }
};

exports.deleteSpeaker = async (req, res) => {
  const user = verificaUtilizatorLogat(req);
  if (!user) {
    res.redirect('/speaker');
  }
  try {
    await Speaker.findByIdAndDelete(req.params.speakerId);
    res.redirect('/speaker');
  } catch (error) {
    res.status(500).redirect('/speaker', {user: user});
  }
};