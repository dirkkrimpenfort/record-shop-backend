const Chance = require('chance');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Address = require('./models/Address.js'); 


const { connect } = require('./configs/db');
connect();

// Simulierte User-Daten
const createUser = () => {
  const chance = new Chance();
  return {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email({domain:"example.com"}),
    password: chance.word({ length: 10 }),
  };
};

// Simulierte Address-Daten
const createAddress = () => {
  const chance = new Chance();
  return {
    street: chance.street(),
    city: chance.city(),
    zip: chance.zip(),
    country: chance.country(),
  };
};

async function seedDatabase() {
  try {
    await connect();
    console.log('MongoDB wurde verbunden auf localhost');

    const userData = Array.from({ length: 10 }, createUser);
    const addressData = Array.from({ length: 10 }, createAddress);

    // Adressen erstellen und in die Datenbank einfügen
    const addressDocs = await Address.insertMany(addressData);
    
    // Benutzerdaten erstellen und Adress-IDs zuweisen
    const users = await User.insertMany(userData);

    // Passwörter verschlüsseln und speichern
    users.forEach(async (user, index) => {
      const plaintextPassword = user.password;
      user.password = user.encryptPassword(user.password);
      user.address = addressDocs[index]._id;
      await user.save();
      console.log('Password before encryption:', plaintextPassword);
      console.log('Password after encryption:', user.password);
      
    });
    console.log('Daten erfolgreich eingefügt:', users);
    
  } catch (err) {
    console.error('Fehler beim Erstellen der simulierten Daten:', err);
  } 
  finally {
    //mongoose.connection.close();
  }
}
seedDatabase();
