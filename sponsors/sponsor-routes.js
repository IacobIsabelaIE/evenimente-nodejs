const express = require("express");
const router = express.Router();
const {
  getAllSponsors,
  newSponsorForm,
  addSponsor,
  editSponsorForm,
  editSponsor,
  deleteSponsor
} = require("./sponsor-controller");

router.get('/sponsor', getAllSponsors);
router.get('/sponsor/new', newSponsorForm);
router.post('/sponsor', addSponsor);
router.get('/sponsor/edit/:sponsorId', editSponsorForm);
router.post('/sponsor/edit/:sponsorId', editSponsor);
router.post('/sponsor/delete/:sponsorId', deleteSponsor);

module.exports = router;