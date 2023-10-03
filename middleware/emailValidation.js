const validator = require('validator');
const User = require('../models/User');

exports.emailFormat = async (req, res, next) => {
    const { email } = req.body;
    console.log('Eingegebene Email:', email);

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Ungültige E-Mail Adresse" });
    }

    
};



