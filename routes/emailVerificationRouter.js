const express = require("express");
const router = express.Router();
const emailVerificationController = require("../controller/emailVerificationController");

router.route("/")
.post(emailVerificationController.createLink);
module.exports = router;