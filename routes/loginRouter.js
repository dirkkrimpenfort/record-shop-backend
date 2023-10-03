const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.route("/").post(loginController.loginUser);

module.exports = router;
