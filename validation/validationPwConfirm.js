const validator = require('express-validator');

const passwordConfirmationMethod = (value) =>
{
    console.log ('Prüfung startet')
    if(value !== req.body.password)
    {
        throw new Error('Fehler: Passwort nicht gleich');
    }
    return true;
}

module.exports = passwordConfirmationMethod;