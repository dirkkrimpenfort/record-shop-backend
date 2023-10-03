const mongoose = require('mongoose');
const User = require('./models/User');
const Record = require('./models/Record');
const Order = require('./models/Order');
const Address = require('./models/Address');
const { connect } = require('./configs/db');

// Funktion zum Löschen aller Dokumente aus einer bestimmten Kollektion
const deleteCollection = async (model) => {
  try {
    console.log(`Lösche Dokumente in der ${model.collection.collectionName} Kollektion`);
    const result = await model.deleteMany({});
    console.log(`Alle Dokumente in der ${model.collection.collectionName} Kollektion wurden gelöscht.`);
  } catch (error) {
    console.error(`Fehler beim Löschen der Dokumente in der ${model.collection.collectionName} Kollektion:`, error);
  }
};

// Funktion zum Löschen aller Dokumente aus allen Kollektionen
const deleteAllCollections = async () => {
  try {
    await connect(); // Verbindung zur Datenbank herstellen
    console.log('MongoDB wurde verbunden auf localhost');

    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await deleteCollection(collection);
    }
  } catch (error) {
    console.error('Fehler beim Löschen der Kollektionen:', error);
  } finally {
    mongoose.connection.close(); // Hier wird die Verbindung zur Datenbank geschlossen
    console.log('Verbindung zur Datenbank geschlossen');
  }
};

// Aufrufen der Funktion zum Löschen aller Dokumente aus allen Kollektionen
deleteAllCollections();

