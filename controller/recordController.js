const Record = require("../models/Record");

exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).send("Error fetching records");
  }
};

exports.createRecord = async (req, res) => {
  const newRecord = req.body;
  try {
    const record = await Record.create(newRecord);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).send("Error creating record");
  }
};

exports.getRecordById = async (req, res) => {
  const recordId = req.params.id;
  try {
    const record = await Record.findById(recordId);
    if (!record) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(record);
    }
  } catch (error) {
    res.status(500).send("Error fetching record");
  }
};

exports.updateRecordById = async (req, res) => {
  const recordId = req.params.id;
  const updatedRecord = req.body;
  try {
    const record = await Record.findByIdAndUpdate(recordId, updatedRecord, {
      new: true,
    });
    if (!record) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(record);
    }
  } catch (error) {
    res.status(500).send("Error updating record");
  }
};

exports.deleteRecordById = async (req, res) => {
  const recordId = req.params.id;
  try {
    const result = await Record.findByIdAndDelete(recordId);
    if (!result) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).send("Record deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting record");
  }
};
