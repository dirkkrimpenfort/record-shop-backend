const bcrypt = require('bcrypt');
const { createToken } = require('../controller/jwtController');
const User = require('../models/User');
const { checkExistingEmail } = require('../middleware/emailDuplikate');
require('dotenv').config();
const secretKey = process.env.SECRET; 

exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Suche in der Datenbank nach dem Benutzer anhand der E-Mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Ungültige Anmeldeinformationen' });
    }

    // Überprüfe das Passwort
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Ungültige Anmeldeinformationen' });
    }

    const token = createToken({ userId: user._id, firstName: user.firstName, lastName: user.lastName });

    // Sende das Token und Benutzerinformationen an das Frontend
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Fehler bei der Anmeldung:', error);
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' });
  }
};
