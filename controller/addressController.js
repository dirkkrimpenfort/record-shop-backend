const Address = require("../models/Address");

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).send("Error fetching addresses");
  }
};

exports.createAddress = async (req, res) => {
  const newAddress = req.body;
  try {
    const address = await Address.create(newAddress);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).send("Error creating address");
  }
};

exports.getAddressByStreet = async (req, res) => {
  const streetName = req.params.street;

  try {
    const address = await Address.findOne({ street: streetName });
    if (!address) {
      res.status(404).send("Address not found");
    } else {
      res.status(200).json(address);
    }
  } catch (error) {
    res.status(500).send("Error fetching address");
  }
};

exports.updateAddressByStreet = async (req, res) => {
  const streetName = req.params.street;
  const updatedAddressData = req.body;
  console.log(updatedAddressData);
  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { street: streetName },
      updatedAddressData,
      { new: true } // Damit wird das aktualisierte Dokument zurückgegeben
    );

    if (!updatedAddress) {
      res.status(404).send("Address not found");
    } else {
      res.status(200).json(updatedAddress);
    }
  } catch (error) {
    res.status(500).send("Error updating address");
  }
};

exports.deleteAddressByStreet = async (req, res) => {
  try {
    const addressId = req.params.street;
    console.log(addressId);
    const result = await Address.findOneAndDelete(
      { street: addressId },
      { new: true }
    );
    console.log(result);
    if (!result) {
      res.status(404).send("Address not found");
    } else {
      res.status(200).send("Address deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting address");
  }
};
