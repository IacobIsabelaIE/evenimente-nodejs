const express = require("express");
const router = express.Router();
const {
  getAllPartners, newPartnerForm, addPartner, editPartner, editPartnerForm, deletePartner
} = require("./partner-controller");

router.get("/partener", getAllPartners);
router.get("/partener/new", newPartnerForm);
router.post('/partener', addPartner);
router.get('/partener/edit/:partenerId', editPartnerForm);
router.post('/partener/edit/:partenerId', editPartner);
router.post('/partener/delete/:partenerId', deletePartner);

module.exports = router;
