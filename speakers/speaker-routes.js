const express = require("express");
const router = express.Router();
const {
  getAllSpeakers,
  newSpeakerForm,
  addSpeaker,
  editSpeakerForm,
  editSpeaker,
  deleteSpeaker,
} = require("./speaker-controller");

router.get("/speaker", getAllSpeakers);
router.get("/speaker/new", newSpeakerForm);
router.post('/speaker', addSpeaker);
router.get('/speaker/edit/:speakerId', editSpeakerForm);
router.post('/speaker/edit/:speakerId', editSpeaker);
router.post('/speaker/delete/:speakerId', deleteSpeaker);

module.exports = router;