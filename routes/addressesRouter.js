const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController");

router
  .route("/")
  .get(addressController.getAddresses)
  .post(addressController.createAddress);

router
  .route("/:street")
  .get(addressController.getAddressByStreet)
  .put(addressController.updateAddressByStreet)
  .delete(addressController.deleteAddressByStreet);

module.exports = router;
