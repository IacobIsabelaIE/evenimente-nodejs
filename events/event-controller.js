const Event = require("./event");
const Partner = require("../partners/partner");
const Speaker = require("../speakers/speaker");
const Sponsor = require("../sponsors/sponsor");
const {verificaUtilizatorLogat} = require("../authentication/auth-controller");

exports.getAllEvents = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    const events = await Event.find({})
      .populate({
        path: "partner",
        model: Partner,
      })
      .populate({
        path: "speaker",
        model: Speaker,
      })
      .populate({
        path: "sponsor",
        model: Sponsor,
      });
      res.render('list-event', { events: events, user: user });
  } catch (error) {
    res.status(500).send({ message:"EROARE!", error: error.message });
  }
};

exports.newEventForm = async (req, res) => {
  const sponsors = await Sponsor.find({});
  const speakers = await Speaker.find({});
  const parteners = await Partner.find({});
  const user = verificaUtilizatorLogat(req);
  if (user) {
    res.render('form-event', { event: null, sponsors: sponsors, speakers: speakers, parteners: parteners, user: user }); 
  } else {
    res.redirect("/event");
  }
};


exports.addEvent = async (req, res) => {
  const {
    titlu,
    descriere,
    data,
    locatie,
    program,
    sponsor,
    speaker,
    partner,
  } = req.body;
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/event");
    }
    const newEvent = new Event({titlu,
      descriere,
      data,
      locatie,
      program,
      sponsor,
      speaker,
      partner});
    await newEvent.save();
    res.redirect('/event');
  } catch (error) {
    res.status(500).send({ message:"EROARE!", error: error.message });
  }
};

exports.editEventForm = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/event");
    }
    const event = await Event.findById(req.params.eventId);
    const sponsors = await Sponsor.find({});
    const speakers = await Speaker.find({});
    const parteners = await Partner.find({});
    if (!event) {
      res.redirect('/event');
    } else {
      res.render('form-event', { event: event, sponsors: sponsors, speakers: speakers, parteners: parteners, user: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/event');
  }
};

exports.editEvent = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/event");
    }
    await Event.findByIdAndUpdate(req.params.eventId, req.body);
    res.redirect('/event');
  } catch (error) {
    res.status(400).render('form-event', { event: req.body, error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const user = verificaUtilizatorLogat(req);
    if (!user) {
      res.redirect("/event");
    }
    await Event.findByIdAndDelete(req.params.eventId);
    res.redirect('/event');
  } catch (error) {
    res.status(500).redirect('/event');
  }
};
