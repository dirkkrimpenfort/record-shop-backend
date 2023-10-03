const MailDev = require('maildev');

const maildev = new MailDev({
  smtp: 1025, // SMTP-Port für ausgehende E-Mails
  web: 1080, // Port für die Webanwendung von MailDev
});

maildev.listen(); // MailDev starten

module.exports = maildev;
