const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  newEventForm,
  addEvent,
  editEventForm,
  editEvent,
  deleteEvent,
} = require("./event-controller");

router.get('/event', getAllEvents);
router.get('/event/new', newEventForm);
router.post('/event', addEvent);
router.get('/event/edit/:eventId', editEventForm);
router.post('/event/edit/:eventId', editEvent);
router.post('/event/delete/:eventId', deleteEvent);

module.exports = router;

