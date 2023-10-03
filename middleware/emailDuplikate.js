const User = require("../models/User");
const checkExistingEmail = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({ error: "E-Mail-Adresse bereits vorhanden" });
  }
};

module.exports = { checkExistingEmail };
