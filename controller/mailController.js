const maildev = require('../configs/maildev-config'); // Verwenden Sie die bereits konfigurierte MailDev-Instanz

// Funktion zum Senden einer E-Mail
const sendMail = (req, res) => {
  const { to, subject, text } = req.body;

  // Senden Sie die E-Mail über MailDev
  maildev.send({
    to,
    subject,
    text,
  });

  res.json({ message: 'E-Mail gesendet!' });
};

// Funktion zum Abrufen von E-Mails (falls erforderlich)
const getMail = (req, res) => {

};

module.exports = {
  sendMail,
  getMail,
};
